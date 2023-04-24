import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    toDo: [
      { id: 1, name: "Download Android App" },
      { id: 2, name: "Change and update account details in the IOS app" }
    ],
    inProgress: [
      { id: 3, name: "Set up recurring utilities payments" },
      { id: 4, name: "View transaction history by category" },
      { id: 5, name: "Set and monitor progress on financial goals" }
    ],
    completed: [
      { id: 6, name: "Download IOS app" },
      { id: 7, name: "Transfer Money between Accounts" }
    ]
  };

  startPoint = (e, id, status) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("status", status);
  };

  endPoint = (e) => {
    e.preventDefault();
  };

  onDrop = (e, status) => {
    const id = e.dataTransfer.getData("id");
    const itemStatus = e.dataTransfer.getData("status");
    if (itemStatus !== status) {
      const item = this.state[itemStatus].find((item) => item.id == id);
      const newItem = { ...item };
      newItem.id = Math.max(...this.state[status].map((item) => item.id), 0) + 1;
      this.setState((prevState) => ({
        [itemStatus]: prevState[itemStatus].filter((item) => item.id != id),
        [status]: [...prevState[status], newItem]
      }));
    }
  };

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return (
      <div className="app">
        <div className="column" onDrop={(e) => this.onDrop(e, "toDo")} onDragOver={(e) => this.endPoint(e)}>
          <span className='jota'>To Do</span>
          <div className='line1'></div>
          {this.state.toDo.map((task) => (
            <div
              key={task.id}
              className="task"
              style={{ border: `2px solid ${this.getRandomColor()}` }}

              draggable
              onDragStart={(e) => this.startPoint(e, task.id, "toDo")}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div className="column" onDrop={(e) => this.onDrop(e, "inProgress")} onDragOver={(e) => this.endPoint(e)}>
          <span className='jota'>In Progress</span>
          <div className='line2'></div>
          {this.state.inProgress.map((task) => (
            <div
              key={task.id}
              className="task"
              style={{ border: `2px solid ${this.getRandomColor()}` }}

              draggable
              onDragStart={(e) => this.startPoint(e, task.id, "inProgress")}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div className="column" onDrop={(e) => this.onDrop(e, "completed")} onDragOver={(e) => this.onDragOver(e)}>
          <span className='jota'>Completed</span>
          <div className='line3'></div>
          {this.state.completed.map((task) => (
            <div
              key={task.id}
              className="task"
              style={{ border: `2px solid ${this.getRandomColor()}` }}

              draggable
              onDragStart={(e) => this.startPoint(e, task.id, "completed")}
            >
              {task.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;





