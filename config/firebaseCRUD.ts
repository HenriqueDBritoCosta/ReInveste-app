//config/firebaseCrud.ts
import { child, ref as dbRef, get, remove, set, update } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebaseConfig";

export async function createOrUpdateUser(uid: string, payload: any) {
  return set(dbRef(db, `usuario/${uid}`), payload);
}

export async function readUser(uid: string) {
  const snapshot = await get(child(dbRef(db), `usuario/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
}

export async function updateUser(uid: string, payload: any) {
  return update(dbRef(db, `usuario/${uid}`), payload);
}

export async function deleteUser(uid: string) {
  // delete DB node
  await remove(dbRef(db, `usuario/${uid}`));
  // You might want to delete storage files as well — omitted for safety
}

export async function uploadProfileImage(uid: string, blob: Blob) {
  const sRef = storageRef(storage, `fotosPerfil/${uid}/perfil.jpg`);
  await uploadBytes(sRef, blob);
  const url = await getDownloadURL(sRef);
  return url;
}
