import React from "react";
import {
  FirebaseAppProvider,
  useFirebaseApp,
  preloadUser,
  preloadStorage,
  preloadAuth,
} from "reactfire";
import "firebase/performance";
import config from "./firebase.config";

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

const FirebaseProvider: React.FC = ({ children }) => {
  const firebaseApp = useFirebaseApp();

  // Kick off fetches for SDKs and data that
  // we know our components will eventually need.
  //
  // This is OPTIONAL but encouraged as part of the render-as-you-fetch pattern
  // https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense
  // @ts-ignore
  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      {children}
    </FirebaseAppProvider>
  );
};

export default FirebaseProvider;
