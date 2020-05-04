import React from "react";
import Main from "./ui/atomic/templates/Main";
import Appbar from "./ui/atomic/organisms/Appbar";

import {
  useFirebaseApp,
  preloadUser,
  preloadStorage,
  preloadAuth,
} from "reactfire";
import "firebase/performance";

// Our components will lazy load the
// SDKs to decrease their bundle size.
// Since we know that, we can start
// fetching them now
const preloadSDKs = (firebaseApp: any) => {
  return Promise.all([preloadStorage(firebaseApp), preloadAuth(firebaseApp)]);
};

const preloadData = async (firebaseApp: any) => {
  const user = await preloadUser(firebaseApp);

  if (user) {
    // @ts-ignore
    preloadDatabase(firebaseApp, (data: any) => {
      console.log(data);
    });
  }
};

const App = () => {
  const firebaseApp = useFirebaseApp();

  // Kick off fetches for SDKs and data that
  // we know our components will eventually need.
  //
  // This is OPTIONAL but encouraged as part of the render-as-you-fetch pattern
  // https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense
  // @ts-ignore
  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));
  return (
    <>
      <Appbar />
      <Main />
    </>
  );
};

export default App;
