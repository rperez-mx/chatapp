import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { profile, user } from "../../app/features/User/userSlice";
import { app } from '../../app/firebase/config';
const db = getFirestore(app);
const getContacts = async (uid : string) => {
  let contacts: Array<user> = [];
  let p: user = {} as user;
  const q = query(collection(db, "users"), where('uid', "!=", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    p = doc.data() as user;
      contacts = [...contacts, p];
    });
  return contacts
};

export { getContacts };
