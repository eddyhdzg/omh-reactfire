import React, { useState } from "react";
import {
  SuspenseWithPerf,
  useStorageTask,
  AuthCheck,
  StorageImage,
  useStorage,
  useUser,
} from "reactfire";
import { Button } from "@material-ui/core";

const UploadProgress = ({
  uploadTask,
  storageRef,
}: {
  uploadTask: firebase.storage.UploadTask;
  storageRef: firebase.storage.Reference | undefined;
}) => {
  const { bytesTransferred, totalBytes } = useStorageTask(
    uploadTask,
    storageRef!
  );

  const percentComplete =
    Math.round(100 * (bytesTransferred / totalBytes)) + "%";

  return <span>{percentComplete}</span>;
};

const ImageUploadButton = ({ uid }: { uid: string }) => {
  const [uploadTask, setUploadTask] = useState<firebase.storage.UploadTask>();
  const storage = useStorage();
  const ref = storage.ref(`users/${uid}/images`);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    // @ts-ignore
    const fileToUpload = fileList[0];
    const newRef = ref.child("Avatar");

    const uploadTask = newRef.put(fileToUpload);

    uploadTask.then(() => {
      setUploadTask(undefined);
      window.location.reload(false);
    });
    setUploadTask(uploadTask);
  };

  return (
    <>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      {uploadTask ? (
        <SuspenseWithPerf
          fallback="waiting for progress..."
          traceId="storage-upload"
        >
          <UploadProgress uploadTask={uploadTask} storageRef={ref} />
        </SuspenseWithPerf>
      ) : (
        ""
      )}
    </>
  );
};

const Avatar = ({ uid }: { uid: string }) => {
  const [exist, setExist] = useState(false);
  const storage = useStorage();
  const ref = storage.ref(`users/${uid}/images`);

  ref.child("Avatar").getDownloadURL().then(onResolve, onReject);

  function onResolve(foundURL: any) {
    setExist(true);
  }

  function onReject(error: any) {
    console.log(error.code);
    setExist(false);
  }

  return exist ? (
    <StorageImage
      storagePath={`users/${uid}/images/Avatar`}
      alt="demo avatar"
      style={{ width: "100%" }}
    />
  ) : (
    <span>No Image</span>
  );
};

const Storage = () => {
  const user: firebase.User = useUser();

  return (
    <>
      {user && <Avatar uid={user?.uid} />}
      <br />
      {user && <ImageUploadButton uid={user?.uid} />}
    </>
  );
};

const SuspenseWrapper = () => {
  return (
    <SuspenseWithPerf fallback="loading..." traceId="storage-root">
      <AuthCheck fallback="sign in to use Storage">
        <Storage />
      </AuthCheck>
    </SuspenseWithPerf>
  );
};

export default SuspenseWrapper;
