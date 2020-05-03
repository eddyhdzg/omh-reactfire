import React from "react";

import {
  AuthCheck,
  SuspenseWithPerf,
  useDatabase,
  useDatabaseListData,
  useAuth,
  useDatabaseObjectData,
} from "reactfire";

import { List, Typography } from "@material-ui/core";
import { CreateClass, Counter } from "../ui/atomic/molecules";
import { ClassListItem } from "../ui/atomic/atoms";
import { TClass } from "../lib/types";

const Classes = () => {
  const database = useDatabase();
  const auth = useAuth();
  const { uid } = auth.currentUser!;
  const ref = database.ref(`users/${uid}/classes`);

  const classes: TClass[] = useDatabaseListData(ref, { idField: "id" });

  const addClass = (name: string) => {
    const newClassRef = ref.push();
    return newClassRef.set({
      name,
    });
  };

  const removeClass = (id: string) => ref.child(id).remove();

  const updateClass = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref
      .update({
        [e.target.id]: {
          name: e.target.value,
        },
      })
      .catch((err) => console.log(err));
  };

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
  const auth = useAuth();
  const { uid } = auth.currentUser!;
  const database = useDatabase();

  const ref = database.ref(`users/${uid}/counter`);
  const increment = (amountToIncrement: number) =>
    ref.transaction((counterVal: number) => counterVal + amountToIncrement);

  const count = useDatabaseObjectData(ref);

  ref.once("value", function (snapshot) {
    if (!snapshot.exists()) ref.set(0);
  });

  return <Counter increment={increment} count={Number(count)} />;
};

const SuspenseWrapper = () => {
  return (
    <SuspenseWithPerf fallback="loading..." traceId="RTDB-root">
      <AuthCheck fallback="sign in to use Realtime Database">
        <Typography variant="h6" gutterBottom>
          Contador
        </Typography>
        <MyCounter />

        <Typography variant="h6" gutterBottom>
          Materias que voy a reprobar
        </Typography>
        <Classes />
      </AuthCheck>
    </SuspenseWithPerf>
  );
};

export default SuspenseWrapper;
