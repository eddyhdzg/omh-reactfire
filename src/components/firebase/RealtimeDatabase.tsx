import React from "react";

import {
  AuthCheck,
  SuspenseWithPerf,
  useDatabase,
  useDatabaseListData,
  useDatabaseObjectData,
  useUser,
} from "reactfire";

import { List, Typography } from "@material-ui/core";
import { CreateClass, Counter } from "../ui/atomic/molecules";
import { ClassListItem } from "../ui/atomic/atoms";
import { TClass } from "../lib/types";

const Classes = () => {
  const database = useDatabase();
  const user: firebase.User = useUser();
  const { uid } = user;
  checkIfUserExists(database, user);

  const ref = database.ref(`users/${uid}/classes`);

  const classes: TClass[] = useDatabaseListData(ref, { idField: "id" });

  const addClass = (name: string) => {
    return ref.push({ name });
  };

  const removeClass = (id: string) => {
    return ref.child(id).remove();
  };

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
  const database = useDatabase();
  const ref = database.ref(`globalCounter/counter`);
  const count = useDatabaseObjectData(ref);

  const increment = (amountToIncrement: number) =>
    ref.transaction((counterVal: number) => counterVal + amountToIncrement);

  ref.once("value", function (snapshot) {
    if (!snapshot.exists()) ref.set(0);
  });

  return <Counter increment={increment} count={Number(count)} />;
};

// use firebase functions instead
// https://firebase.google.com/docs/functions/auth-events#trigger_a_function_on_user_creation
const checkIfUserExists = (
  database: firebase.database.Database,
  user: firebase.User
) => {
  const { displayName, uid, email } = user;
  const ref = database.ref(`users/${uid}`);
  ref.once("value", function (snapshot) {
    if (!snapshot.exists())
      ref.set({
        name: displayName,
        email,
      });
  });
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
  return (
    <SuspenseWithPerf fallback="loading..." traceId="RTDB-root">
      <AuthCheck fallback="sign in to use Realtime Database">
        <RealTimeDatabase />
      </AuthCheck>
    </SuspenseWithPerf>
  );
};

export default SuspenseWrapper;
