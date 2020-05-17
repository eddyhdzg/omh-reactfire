import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { SuspenseWithPerf, useUser, useAuth } from "reactfire";
import { Button, Typography, Avatar } from "@material-ui/core";

const signOut = (auth: firebase.auth.Auth) => {
  auth.signOut().then(() => console.log("signed out"));
};

const UserDetails = ({ user }: { user: firebase.User }) => {
  const { displayName, email, photoURL } = user;
  const auth = useAuth();

  return (
    <>
      <Avatar alt="google avatar" src={photoURL ? photoURL : undefined} />

      <Typography variant="subtitle1" gutterBottom>
        Displayname: <b>{displayName}</b>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Email: <b>{email}</b>
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

const Auth = () => {
  const user: firebase.User = useUser();
  return user ? <UserDetails user={user} /> : <SignInForm />;
};

const AuthWrapper = () => {
  return (
    <SuspenseWithPerf
      traceId={"firebase-user-wait"}
      fallback={<p>loading...</p>}
    >
      <Auth />
    </SuspenseWithPerf>
  );
};

export default AuthWrapper;
