import React, { useState } from "react";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { SuspenseWithPerf, useUser, useAuth } from "reactfire";
import { Button, Typography, Avatar } from "@material-ui/core";

const signOut = (auth: any) => {
  auth(false);
};

const UserDetails = ({
  user,
  setIsAuthenticated,
}: {
  user: any;
  setIsAuthenticated: any;
}) => {
  const { displayName, email, photoURL } = user;

  return (
    <>
      <Avatar alt="google avatar" src={photoURL} />

      <Typography variant="subtitle1" gutterBottom>
        Displayname: <b>{displayName}</b>
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Email: <b>{email}</b>
      </Typography>

      <Button variant="contained" onClick={() => signOut(setIsAuthenticated)}>
        Sign Out
      </Button>
    </>
  );
};

const SignInForm = ({ setIsAuthenticated }: { setIsAuthenticated: any }) => {
  return <Button onClick={() => setIsAuthenticated(true)}>Sign In</Button>;
};

const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = {
    displayName: "Nombre",
    email: "ejemplo@gmail.com",
    photoURL: undefined,
  };

  return isAuthenticated ? (
    <UserDetails user={user} setIsAuthenticated={setIsAuthenticated} />
  ) : (
    <SignInForm setIsAuthenticated={setIsAuthenticated} />
  );
};

const AuthWrapper = () => {
  return <Auth />;
};

export default AuthWrapper;
