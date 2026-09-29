import { auth } from "./firebase";

export async function getApiAuthHeaders() {
  const firebaseToken = auth.currentUser
    ? await auth.currentUser.getIdToken()
    : null;
  const token = firebaseToken || localStorage.getItem("accessToken");

  return token ? { Authorization: `Bearer ${token}` } : {};
}
