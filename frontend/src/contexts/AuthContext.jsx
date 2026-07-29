import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseEnabled } from "../firebase/firebaseConfig.js";

const AuthContext = createContext(null);
const DEMO_USERS = {
  "student@demo.ikr": { uid: "demo-student", name: "Pelajar Demo", role: "student", matricNo: "IKR26001", className: "DKA30S", email: "student@demo.ikr" },
  "lecturer@demo.ikr": { uid: "demo-lecturer", name: "Pensyarah Demo", role: "lecturer", staffId: "STF001", email: "lecturer@demo.ikr" },
  "admin@demo.ikr": { uid: "demo-admin", name: "Admin Sistem", role: "admin", staffId: "ADM001", email: "admin@demo.ikr" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("ikr-session") || "null"));
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled) return;
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) { setUser(null); setLoading(false); return; }
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      const profile = snap.exists() ? snap.data() : { role: "student", name: firebaseUser.displayName || firebaseUser.email };
      setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...profile });
      setLoading(false);
    });
  }, []);

  async function login(email, password) {
    if (!firebaseEnabled) {
      if (password !== "demo123" || !DEMO_USERS[email]) throw new Error("Gunakan akaun demo dan kata laluan demo123.");
      setUser(DEMO_USERS[email]); localStorage.setItem("ikr-session", JSON.stringify(DEMO_USERS[email])); return DEMO_USERS[email];
    }
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function register(form) {
    if (!firebaseEnabled) {
      const profile = { uid: `local-${Date.now()}`, email: form.email, name: form.name, role: form.role || "student", matricNo: form.matricNo || "", staffId: form.staffId || "", className: form.className || "" };
      setUser(profile); localStorage.setItem("ikr-session", JSON.stringify(profile)); return profile;
    }
    const credential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const profile = { name: form.name, email: form.email, role: "student", matricNo: form.matricNo || "", staffId: form.staffId || "", className: form.className || "", createdAt: serverTimestamp() };
    await setDoc(doc(db, "users", credential.user.uid), profile);
  }

  async function logout() { if (firebaseEnabled) await firebaseSignOut(auth); setUser(null); localStorage.removeItem("ikr-session"); }
  const value = useMemo(() => ({ user, loading, login, register, logout, firebaseEnabled }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
