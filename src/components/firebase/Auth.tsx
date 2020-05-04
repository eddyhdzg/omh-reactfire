import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { SuspenseWithPerf, useUser, useAuth } from "reactfire";
import { Button, Typography } from "@material-ui/core";

const signOut = (auth: firebase.auth.Auth) => {
  auth.signOut().then(() => console.log("signed out"));
};

const UserDetails = ({ user }: { user: firebase.User }) => {
  const auth = useAuth();

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Displayname: <b>{user?.displayName}</b>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Email: <b>{user?.email}</b>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        uID: <b>{user?.uid}</b>
      </Typography>

      <Button variant="contained" onClick={() => signOut(auth)}>
        Sign Out
      </Button>
    </>
  );
};

const SignInForm = () => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
};

const FirebaseAuthStateButton = () => {
  const user: firebase.User = useUser();
  return user ? <UserDetails user={user} /> : <SignInForm />;
};

const Auth = () => {
  return (
    <SuspenseWithPerf
      traceId={"firebase-user-wait"}
      fallback={<p>loading...</p>}
    >
      <FirebaseAuthStateButton />
    </SuspenseWithPerf>
  );
};

export default Auth;
