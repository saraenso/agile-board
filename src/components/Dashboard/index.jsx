import { Grid, Typography, Paper, Button } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useStore from "../../hooks/useStore";
import Column from "./Column";
import { useCallback } from "react";
import NewTaskDialog from "./NewTaskDialog";
import { useState } from "react";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  minHeight: 500,
});

export const Dashboard = observer(() => {
  const { boards } = useStore();
  const [newTaskToSection, setNewTaskToSection] = useState(null);

  const closeDialog = useCallback(() => {
    setNewTaskToSection(null);
  }, [setNewTaskToSection]);

  const onDragEnd = useCallback(
    (event) => {
      const { source, destination, draggableID: taskID } = event;

      boards.active.moveTask(taskID, source, destination);
    },
    [boards]
  );

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards.active?.sections?.map((section) => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">{section?.title}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setNewTaskToSection(section.id);
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Droppable droppableId={section?.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Column section={section} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        open={!!newTaskToSection}
        handleClose={closeDialog}
        activeSection={newTaskToSection}
      />
    </Box>
  );
});
