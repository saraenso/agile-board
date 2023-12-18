import { Grid, Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useStore from "../../hooks/useStore";
import Column from "./Column";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  minHeight: 500,
});

export const Dashboard = observer(() => {
  const { boards } = useStore();

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={() => {}}>
        <Grid container>
          {boards.active?.sections?.map((section) => {
            return (
              <Grid item key={section.id}>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h5">{section?.title}</Typography>
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
    </Box>
  );
});
