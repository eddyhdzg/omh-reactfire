import React, { useState } from "react";
import {
  SuspenseWithPerf,
  useDatabaseObjectData,
  useDatabase,
  useDatabaseListData,
} from "reactfire";
import InputBase from "@material-ui/core/InputBase";
interface ITodo {
  id: string;
  text: string;
  done: boolean;
}
interface ITodosForm {
  addTodo: (text: string) => firebase.database.ThenableReference;
}

const Counter = () => {
  const database = useDatabase();
  const ref = database.ref("/counter");

  const counter: number = useDatabaseObjectData(ref);

  const handleSetCount = (num: number) =>
    ref.transaction((currentValue) => currentValue + num);

  return (
    <>
      <button type="button" onClick={() => handleSetCount(-1)}>
        -1
      </button>
      {counter}
      <button type="button" onClick={() => handleSetCount(1)}>
        1
      </button>
    </>
  );
};

const ConterWrapper = () => {
  return (
    <SuspenseWithPerf fallback="loading..." traceId="RTDB-counter">
      <Counter />
    </SuspenseWithPerf>
  );
};

const TodoForm = (props: ITodosForm) => {
  const { addTodo } = props;
  const [text, setText] = useState("");

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      addTodo(text).then(() => {
        setText("");
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmitForm(e)}>
      <input
        type="text"
        value={text}
        placeholder="Add todo"
        onChange={({ target }) => setText(target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const Todos = () => {
  const database = useDatabase();
  const ref = database.ref("/todos");
  const todos: ITodo[] = useDatabaseListData(ref, { idField: "id" });

  const handleAddTodo = (text: string) => ref.push({ text, done: false });

  const toggleComplete = (id: string, done: boolean) =>
    ref.child(id).update({ done: !done });

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    ref.child(e.target.id).update({ text: e.target.value });
  };

  const removeTodo = (id: string) => ref.child(id).remove();

  return (
    <>
      <TodoForm addTodo={handleAddTodo} />
      <ul>
        {todos.map(({ id, done, text }) => {
          return (
            <li
              key={id}
              style={{ textDecoration: done ? "line-through" : undefined }}
            >
              <InputBase
                id={id}
                value={text}
                onChange={(e) => handleUpdate(e)}
              />
              <button type="button" onClick={() => toggleComplete(id, done)}>
                {done ? "Undone" : "Done"}
              </button>
              <button type="button" onClick={() => removeTodo(id)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const TodosWrapper = () => {
  return (
    <SuspenseWithPerf fallback="loading..." traceId="RTDB-todos">
      <Todos />
    </SuspenseWithPerf>
  );
};

export default function App() {
  return (
    <>
      <ConterWrapper />
      <TodosWrapper />
    </>
  );
}
