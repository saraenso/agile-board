import { Draggable } from "react-beautiful-dnd";
import { Card } from "@mui/material";
import Task from "./Task";
import { observer } from "mobx-react-lite";

function getItemStyle(draggableStyle) {
  return {
    padding: 8,
    marginBottom: 8,
    ...draggableStyle,
  };
}

function Column({ section }) {
  return (
    <div>
      {section?.tasks?.map((task, index) => {
        return (
          <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(provided.draggableProps.style)}
              >
                <Task task={task} />
              </Card>
            )}
          </Draggable>
        );
      })}
    </div>
  );
}

export default observer(Column);
