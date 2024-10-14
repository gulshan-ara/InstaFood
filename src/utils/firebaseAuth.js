import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

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

export async function addToCart(item, uid) {
  const userRef = doc(collection(db, "users"), uid);
  const cartRef = doc(collection(userRef, "cart"), item.card?.info?.id);

  return await setDoc(cartRef, {
    ...item,
  });
}

export async function updateCartItem(item, uid) {
  const userRef = doc(collection(db, "users"), uid);
  const cartRef = doc(collection(userRef, "cart"), item.card?.info?.id);

  return await updateDoc(cartRef, {
    quantity: item.quantity,
  });
}

export async function deleteCartItem(itemId, uid) {
  const userRef = doc(collection(db, "users"), uid);
  const cartRef = doc(collection(userRef, "cart"), itemId);

  return await deleteDoc(cartRef);
}

export async function clearCartFromDb(uid) {
  const userRef = doc(collection(db, "users"), uid);
  const cartRef = collection(userRef, "cart");

  const cartDocs = await getDocs(cartRef);

  const deletePromises = cartDocs.docs.map((doc) => deleteDoc(doc.ref));

  return Promise.all(deletePromises);
}

export async function fetchCartList(uid) {
  const userRef = doc(collection(db, "users"), uid);
  const cartRef = collection(userRef, "cart");

  try {
    const cartSnapshot = await getDocs(cartRef);
    let cartItems = [];

    cartSnapshot.forEach((doc) => {
      cartItems.push({ id: doc.id, ...doc.data() });
    });
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    return [];
  }
}

export async function addToOrder() {}

export async function fetchOrderList() {}
