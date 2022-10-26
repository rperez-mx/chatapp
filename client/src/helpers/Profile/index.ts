import { app } from '../../app/firebase/config';
import { profile } from '../../app/features/User/userSlice'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore(app);
const checkUsername = async(username : string) => {
  const usersRef = collection(db, "users");

// Create a query against the collection.
const q = query(usersRef, where("username", "==", username));
const querySnapshot = await getDocs(q);
  if (querySnapshot.size!==0) {
    // console.log(userInfo.data());
   console.log('Username not available')
   return false
   //@ts-ignore
  } else {
    
    console.log(querySnapshot)
    console.log("Username is available");
    return true
  }
}
const updateUser = async(uid: string, username: string, displayName: string, profilePicture: string) => {
  console.log("🚀 ~ file: index.ts ~ line 34 ~ updateUser ~ uid", uid)
  const userRef = doc(db, "users", uid);

// Set the "capital" field of the city 'DC'
await updateDoc(userRef, {
  username: username,
  displayName: displayName,
  profilePicture: profilePicture,
  completed: true
});
return true
}
const addProfile = async (uid: string, profile : profile) =>{
  
  // Add a new document in collection "users"
  await setDoc(doc(db, "profiles", uid), profile);
  console.log('Profile added')
  return true
}
export { checkUsername, updateUser, addProfile } 