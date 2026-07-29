import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, firebaseEnabled, storage } from "../firebase/firebaseConfig.js";
import { MODULE_CATALOG } from "../data/moduleCatalog.js";
import { DEMO_QUIZ_BANK } from "../data/demoQuizBank.js";

const read = (key, fallback=[]) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export async function getModules() {
  if (!firebaseEnabled) return [...MODULE_CATALOG, ...read("ikr-custom-modules")];
  const snap = await getDocs(collection(db, "modules"));
  const remote = snap.docs.map((d) => ({ id:d.id, ...d.data() }));
  return remote.length ? remote : MODULE_CATALOG;
}
export async function addModule(module) {
  if (!firebaseEnabled) { const items=read("ikr-custom-modules"); const next={...module,id:`local-${Date.now()}`}; write("ikr-custom-modules",[...items,next]); return next; }
  return addDoc(collection(db,"modules"), {...module,createdAt:serverTimestamp()});
}
export async function uploadPdf(file, moduleCode) {
  if (!storage) throw new Error("Firebase Storage belum dikonfigurasi.");
  const target=storageRef(storage,`modules/${moduleCode}/${Date.now()}-${file.name}`); await uploadBytes(target,file); return getDownloadURL(target);
}
export async function getQuizQuestions(moduleCode) {
  if (!firebaseEnabled) return DEMO_QUIZ_BANK.filter((q) => q.moduleCode===moduleCode);
  const snap=await getDocs(query(collection(db,"quiz"),where("moduleCode","==",moduleCode)));
  const rows=snap.docs.map((d)=>({id:d.id,...d.data()})); return rows.length?rows:DEMO_QUIZ_BANK.filter((q)=>q.moduleCode===moduleCode);
}
export async function addQuizQuestion(question) {
  if (!firebaseEnabled) { const rows=read("ikr-extra-questions"); const next={...question,id:`local-${Date.now()}`}; write("ikr-extra-questions",[...rows,next]); return next; }
  return addDoc(collection(db,"quiz"),{...question,createdAt:serverTimestamp()});
}
export async function saveResult(result) {
  const data={...result,date:new Date().toISOString()};
  if (!firebaseEnabled) { const rows=read("ikr-results"); write("ikr-results",[...rows,data]); return data; }
  await addDoc(collection(db,"results"),{...result,date:serverTimestamp()}); return data;
}
export async function getResults() {
  if (!firebaseEnabled) return read("ikr-results", [
    {studentId:"demo-student",studentName:"Pelajar Demo",quizId:"IKR3063-demo",moduleCode:"IKR3063",score:80,total:10,date:new Date(Date.now()-86400000).toISOString()},
    {studentId:"siti",studentName:"Siti Nursyahirah",quizId:"IKR3023-demo",moduleCode:"IKR3023",score:92,total:10,date:new Date(Date.now()-7200000).toISOString()},
    {studentId:"awatif",studentName:"Nur Awatif Qalish",quizId:"IKR3043-demo",moduleCode:"IKR3043",score:88,total:10,date:new Date(Date.now()-3600000).toISOString()},
  ]);
  const snap=await getDocs(query(collection(db,"results"),orderBy("date","desc"))); return snap.docs.map((d)=>({id:d.id,...d.data()}));
}
export async function getAnnouncements() {
  if (!firebaseEnabled) return read("ikr-announcements", [{id:"a1",title:"Selamat datang",body:"Platform pembelajaran IKR kini menggabungkan eModul, kuiz, AI Tutor dan komunikasi kelas.",author:"Pentadbir",date:new Date().toISOString()}]);
  const snap=await getDocs(query(collection(db,"announcement"),orderBy("createdAt","desc"))); return snap.docs.map((d)=>({id:d.id,...d.data()}));
}
export async function addAnnouncement(item) {
  if (!firebaseEnabled) { const rows=read("ikr-announcements"); const next={...item,id:`local-${Date.now()}`,date:new Date().toISOString()}; write("ikr-announcements",[next,...rows]); return next; }
  return addDoc(collection(db,"announcement"),{...item,createdAt:serverTimestamp()});
}
export function getProgress(studentId) { return read(`ikr-progress-${studentId}`,{}); }
export function markTopicComplete(studentId,moduleCode,topicId) { const key=`ikr-progress-${studentId}`; const p=read(key,{}); p[moduleCode]=Array.from(new Set([...(p[moduleCode]||[]),topicId])); write(key,p); return p; }
