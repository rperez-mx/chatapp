import { app } from "../../app/firebase/config"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { UserCredential } from "firebase/auth";
import { profile, user } from "../../app//features//User/userSlice";
const db = getFirestore(app);

const checkForUser = async (data: UserCredential) => {
  let u: user = {} as user;
  let user = data.user;
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);
  if (querySnapshot.empty) {
    console.log("User available");
    u = await signUpUser(user.uid);
    console.log("User signed up: OK");
    return u;
  } else {
    console.log("Registered already");
    //get the user info
    const docRef = doc(db, "users", user.uid);
    const userInfo = await getDoc(docRef);
    if (userInfo.exists()) {
      // console.log(userInfo.data());
      u = (await userInfo.data()) as user;
      //@ts-ignore
      localStorage.setItem('profilePicture', user.photoURL)
    } else {
      u = await signUpUser(user.uid);
    }
  }
  return u;
};

//Signup the user, if available
const signUpUser = async (uid: string) => {
  let u: user = {
    uid: uid,
    username: "",
    displayName: '',
    profilePicture: '',
    state: 'Hola, estoy usando SimpleChat',
    online: false,
    completed: false
  };
  // Add a new document in collection "users"
  await setDoc(doc(db, "users", uid), u);
  return u;
};

const getUser = async(username: string ) => {
    console.log(await getUserID(username))
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as user
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  
      return {} as user
    }
  }

  const getUsername = async(uid: string) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      return (docSnap.data() as user).username
    } else {
      return {} as user
    }
  }
  const getUserID = async(username: string) => {
    const docRef = doc(db, 'users', username)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      return (docSnap.data() as user).username
    } else {
      console.log('nah bro')
      return {} as user
    }
  }
export { checkForUser, getUser, getUsername, getUserID, signUpUser };
