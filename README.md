# omh-reactfire

ReactFire Workshop for One-Month-Hack
Build Modern React apps with Hooks, Suspense, and Firebase

## Demo

https://one-month-hack.firebaseapp.com/

## 1. Introduction

[Firebase](https://firebase.google.com/) is a mobile and web application development platform developed by Firebase, Inc. in 2011, then acquired by Google in 2014. As of March 2020, the Firebase platform has 19 products.

![What is Firebase? The complete story, abridged. - Firebase ...](https://miro.medium.com/max/3200/0*HORJhBhTELtW9qQw)

![Using Firebase for Backend-as-a-Service: Pros and Cons](https://marmelab.com/static/65235810b14a0af3f15e908b6fe54aa6/81765/supports.png)

## Instructor

- Eddy Hernández
- UX developer at Vitau
- @eddyhdzg
- ITC - DIC 19

## Why Firebase?

It is not only a database, but multiple services provided by Google and enriching the **developer experience**.
It makes it easy and fast to deploy a backendless application.

## Tools

- React
- Typescript
- [Materual-UI](https://material-ui.com/)
- [Reactfire](https://github.com/FirebaseExtended/reactfire)

## Helpful Links

**Repos**

- [https://github.com/FirebaseExtended/reactfire](https://github.com/FirebaseExtended/reactfire)
- [https://github.com/firebase/firebaseui-web-react](https://github.com/firebase/firebaseui-web-react)

**Youtube Channels**

- [https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA)
- [https://www.youtube.com/user/Firebase](https://www.youtube.com/user/Firebase)

**Videos**

- Reactfire - [https://www.youtube.com/watch?v=Mi9aKDcpRYA&t](https://www.youtube.com/watch?v=Mi9aKDcpRYA&t)
- Fast React Website Deployment With Firebase- [https://www.youtube.com/watch?v=IDHfvpsYShs&t](https://www.youtube.com/watch?v=IDHfvpsYShs&t)
- Firebase - Ultimate Beginner's Guide [https://www.youtube.com/watch?v=9kRgVxULbag&t]
- 100 Firebase Tips, Tricks, and Screw-ups [https://www.youtube.com/watch?v=iWEgpdVSZyg&t]

**Medium**

- React & Firebase markdown editor [https://levelup.gitconnected.com/learn-how-to-build-a-fast-and-responsive-markdown-editor-with-react-firebase-and-swr-79a3a683fced]

## How to run project

**Caution**
- First change config in src/components/firebase/firebase.config.ts to your firebase project data.
- Enable Google Auth, real time database and storage in your firebase console.

```
npm i
npm start
```

## Itinerary

Total: 40min

1.  Introduction - 5 min
2.  Firebase Auth - 5 min
3.  Firebase Realtime Database - 10 min
4.  Firebase Storage - 5 min
5.  Firebase Hosting - 5 min
6.  Q&A - 10 min

## 2. Auth

### Step 1

Enable a provider in the Firebase console (for my case I will enable Google).

### Step 2

StyledFirebaseAuth from - [https://github.com/firebase/firebaseui-web-react](https://github.com/firebase/firebaseui-web-react)
![FirebaseUI for Web — Auth](https://raw.githubusercontent.com/firebase/firebaseui-web/master/demo/screenshot.png =300x)

### More Info in Firebase Auth

- [https://www.youtube.com/watch?v=-OKrloDzGpU](https://www.youtube.com/watch?v=-OKrloDzGpU)

## 3. Realtime Database

Firebase has two tipes of databses

- Realtime Database: Which is basically one big JSON
- Cloud FireStore: More complex NoSQL databases.
  ![Firebase Cloud Firestore v/s Firebase Realtime Database](https://miro.medium.com/max/2564/1*P7LBoMqP4P4LBOTGaSDwGQ.png)

### Step 1

Enable the Realtime Database in the Firebase console.

### Database Structure

    {
    globalCounter: {
    	counter: number
    },
     users:{
        uid:{
    	    name: string,
    	    email: string,
    	    classes:{
    		    cid:{
    			    name: string
    		    }[]
    	    }
        }[]
    }

![Data Structure](https://firebasestorage.googleapis.com/v0/b/one-month-hack.appspot.com/o/dataStructure.png?alt=media&token=cdc4645c-9857-46ee-9190-09ab735ae26f)


### Step 2

Setup Firebase rules

    {
     "rules": {
       ".read": true,
        "users": {
          "$uid": {
            ".write": "$uid === auth.uid",
          }
        },
        "globalCounter": {
          "counter":{
            ".write": "auth.uid != null"
          }
        },
      }
    }

### How To Access Data

1.  First declare database

```
 const  database  =  useDatabase();
```

2.  Access the reference we want

```
const  counterRef  =  database.ref(`globalCounter/counter`);
const  userClassesRef  =  database.ref(`users/${uid}/classes`);
const  userRef  =  database.ref(`users/${uid}`);
```

3.  Consume the data (useDatabaseObjectData or useDatabaseListData)

```
const  count  =  useDatabaseObjectData(ref);
const  classes: TClass[] =  useDatabaseListData(ref, { idField: "id" });
```

### How To Edit Data

// Te Create or Append Data

```
ref.push(value)
```

// To delete Data

```
ref.child(id).remove();
```

// To update data

```
ref.update({
	[id]: {
		field: newValue,
	},
})
```

## 4. Firebase Storage

- Free Tier - 5 GB
- Similar to Amazon's S3

It's worth noting that **S3** isn't exactly the same as **Firebase Storage**. **Firebase Storage** is a wrapper around Google Cloud **Storage**. GCS is very similar to **S3**, but **Firebase Storage** is designed specifically to deal with user uploaded data.

### Step 1

Enable the Firebase Storage

### How To Upload a File

1.  First declare the storage

```
const  storage  =  useStorage();
```

2.  Access the reference where we want to upload a file

```
const { uid }: firebase.User  =  useUser();
const  ref  =  storage.ref(`users/${uid}/images`);
```

3.  Consume the data (useDatabaseObjectData or useDatabaseListData)

```
const fileName = fileToUpload.name;
const newRef = ref
	.child(fileName);
	setRef(newRef);

newRef.put(fileToUpload);
```

### How Acces Images

```
<StorageImage
	storagePath={`users/${uid}/images/Avatar`}
	alt="demo avatar"
/>
```

## 5. Firebase Hosting

### Step 1

Install firebase tools

```
npm install -g firebase-tools
```

### Step 2

Firebase login in terminal
run

```
firebase login
```

### Step 3

Build your react app

```
npm run build
```

### Step 4

Init firebase

```
firebase init
```

### Step 5

Select Hosting

### Step 6

Use build as your public directory

```
build
```

### Step 7

Single Page App = YES

```
y
```

### Step 8

**CAUTION**
Don't overwrite build/index.html

```
N
```

### Step 9

Deploy project

```
firebase deploy
```
