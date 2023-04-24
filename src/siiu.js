import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
    { id: '3', content: 'Task 3' },
    { id: '4', content: 'Task 4' },
  ]);

  function handleDragEnd(result) {
    if (!result.destination) return; // Return if item is dropped outside of a droppable area
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove item from original position
    items.splice(result.destination.index, 0, reorderedItem); // Insert item into new position
    setTasks(items);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="todo-list">
        <Droppable droppableId="to-do">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="task"
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default ToDoList;