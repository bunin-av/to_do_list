import React from "react";
import {TaskType} from "./App";

type ToDoListType = {
    title: string,
    tasks: Array<TaskType>
}

function ToDoList(props: ToDoListType) {
    return (
      <div>
          <h3>{props.title}</h3>
          <div>
              <input/>
              <button>+</button>
          </div>
          {
              props.tasks.map(t => {
                  return (
                    <ul key={t.id}>
                        <li>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                        </li>
                    </ul>
                  )
              })
          }
          <div>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
          </div>
      </div>
    )
}

export default ToDoList;