import { onValue, push, ref, serverTimestamp } from "firebase/database";
import { realtimeDb } from "../firebase/firebaseConfig.js";
const key=(roomId)=>`ikr-chat-${roomId}`;
const initial=[{id:"m1",senderId:"demo-lecturer",senderName:"Pensyarah Demo",role:"lecturer",text:"Selamat datang ke ruang perbincangan kelas. Gunakan ruang ini untuk soalan pembelajaran.",createdAt:Date.now()-3600000}];
export function subscribeMessages(roomId, callback) {
  if (realtimeDb) return onValue(ref(realtimeDb,`chat/rooms/${roomId}/messages`),(snap)=>{const value=snap.val()||{}; callback(Object.entries(value).map(([id,m])=>({id,...m})).sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)));});
  const emit=()=>callback(JSON.parse(localStorage.getItem(key(roomId))||JSON.stringify(initial)));
  emit(); const handler=(e)=>{if(e.key===key(roomId))emit();}; window.addEventListener("storage",handler); return ()=>window.removeEventListener("storage",handler);
}
export async function sendMessage(roomId,message) {
  if (realtimeDb) return push(ref(realtimeDb,`chat/rooms/${roomId}/messages`),{...message,createdAt:serverTimestamp()});
  const rows=JSON.parse(localStorage.getItem(key(roomId))||JSON.stringify(initial)); localStorage.setItem(key(roomId),JSON.stringify([...rows,{...message,id:`local-${Date.now()}`,createdAt:Date.now()}])); window.dispatchEvent(new StorageEvent("storage",{key:key(roomId)}));
}
