import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { user } from "../../app/features/User/userSlice";
import { app } from "../../app/firebase/config";
import { checkForUser } from "../User/index";

const auth = getAuth();
const LoginWithGoogle = async() => {
  let a : user = {} as user
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  a = await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //@ts-ignore
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      let v = checkForUser(result)
      
      // ...
      return v
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      return {} as user
    });
    return a
};

export { LoginWithGoogle };
