import React, { useState, useReducer } from "react";

// import {
//   AuthCheck,
//   SuspenseWithPerf,
//   useDatabase,
//   useDatabaseListData,
//   useDatabaseObjectData,
//   useUser,
// } from "reactfire";

import { List, Typography } from "@material-ui/core";
import { CreateClass, Counter } from "../ui/atomic/molecules";
import { ClassListItem } from "../ui/atomic/atoms";
import { TClass } from "../lib/types";

type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: string }
  | { type: "update"; payload: { id: string; name: string } };

function reducer(state: TClass[], action: Actions) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now().toString(), name: action.payload }];
    case "remove":
      return [...state.filter((val: TClass) => val.id !== action.payload)];
    case "update":
      return [
        ...state.map((val: TClass) => {
          if (val.id !== action.payload.id) {
            return val;
          } else {
            return {
              ...val,
              name: action.payload.name,
            };
          }
        }),
      ];

    default:
      return state;
  }
}

const Classes = ({ uid }: { uid?: string }) => {
  const initialArg: TClass[] = [];
  const [classes, dispatch] = useReducer(reducer, initialArg);

  console.log(classes);

  const addClass = async (name: string) =>
    await dispatch({ type: "add", payload: name });

  const removeClass = (id: string) => dispatch({ type: "remove", payload: id });

  const updateClass = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "update",
      payload: { id: e.target.id, name: e.target.value },
    });

  return (
    <>
      <CreateClass handleSubmitform={addClass} />
      <List aria-label="classes-list">
        {classes.map(({ name, id }, index) => (
          <ClassListItem
            key={id}
            id={id}
            name={name}
            index={index}
            removeClass={() => removeClass(id)}
            updateClass={updateClass}
          />
        ))}
      </List>
    </>
  );
};

const MyCounter = () => {
  const [count, setCount] = useState(0);

  const increment = (amountToIncrement: number) =>
    setCount(count + amountToIncrement);

  return <Counter increment={increment} count={Number(count)} />;
};

const RealTimeDatabase = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Contador Público
      </Typography>
      <MyCounter />

      <Typography variant="h6" gutterBottom>
        Materias que voy a reprobar
      </Typography>
      <Classes />
    </>
  );
};

const SuspenseWrapper = () => {
  return <RealTimeDatabase />;
};

export default SuspenseWrapper;
