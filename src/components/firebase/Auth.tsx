import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { SuspenseWithPerf, useUser, useAuth } from "reactfire";
import { Button, Typography } from "@material-ui/core";

const signOut = (auth: firebase.auth.Auth) =>
  auth.signOut().then(() => console.log("signed out"));

const UserDetails = ({ user }: { user: firebase.User }) => {
  const auth = useAuth();

  return (
    <>
      <Typography variant="h6">Displayname:</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {user.displayName}
      </Typography>

      <Typography variant="h6">uID:</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {user.uid}
      </Typography>

      <ul>
        {user.providerData.map((profile: firebase.UserInfo | null) => (
          <li key={profile?.providerId}>{profile?.providerId}</li>
        ))}
      </ul>

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
  const user: any = useUser();
  return user ? <UserDetails user={user} /> : <SignInForm />;
};

const AuthButton = () => {
  return (
    <SuspenseWithPerf
      traceId={"firebase-user-wait"}
      fallback={<p>loading...</p>}
    >
      <FirebaseAuthStateButton />
    </SuspenseWithPerf>
  );
};

export default AuthButton;
