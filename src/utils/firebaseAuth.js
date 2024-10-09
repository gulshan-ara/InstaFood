import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function userSignUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      username: name,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function userSignIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function userSignOut() {
  return await signOut(auth);
}
