const knowledge=[
  [/osi|layer/i,"Model OSI mempunyai tujuh lapisan: Physical, Data Link, Network, Transport, Session, Presentation dan Application. Semasa troubleshooting, semak dari sambungan fizikal sebelum bergerak ke konfigurasi IP dan aplikasi."],
  [/subnet|30 host/i,"Untuk 30 host, perlukan 32 alamat keseluruhan. Lima bit host memberi 2^5 = 32 alamat; tolak network dan broadcast, tinggal 30 host. Prefix ialah /27 dan subnet mask 255.255.255.224."],
  [/vlan|trunk/i,"VLAN mengasingkan domain broadcast. Access port membawa satu VLAN, manakala trunk membawa beberapa VLAN bertag antara peranti rangkaian."],
  [/routing|router/i,"Routing membolehkan komunikasi antara subnet. Router merujuk routing table dan memilih next hop atau interface keluar."],
  [/security|firewall|keselamatan/i,"Gunakan segmentasi, firewall, SSH, least privilege, kemas kini dan logging. Peraturan firewall mesti mempunyai sumber, destinasi, servis dan tindakan yang jelas."],
];
function local(message){return knowledge.find(([r])=>r.test(message))?.[1]||"Nyatakan topik dengan lebih khusus. Saya boleh membantu tentang OSI, TCP/IP, IP Address, subnetting, VLAN, routing, Packet Tracer dan keselamatan rangkaian."}
export async function answerQuestion(message,history=[]){
  if((process.env.AI_PROVIDER||'local')!=='ollama')return local(message);
  const base=process.env.OLLAMA_BASE_URL||'http://localhost:11434';
  const response=await fetch(`${base}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OLLAMA_MODEL||'qwen3:4b',stream:false,messages:[{role:'system',content:'Anda ialah tutor TVET Program Teknologi Komputer Rangkaian. Jawab dalam Bahasa Melayu yang mudah, tepat dan langkah demi langkah.'},...history.map(x=>({role:x.role,content:x.content})).slice(-8),{role:'user',content:message}]})});
  if(!response.ok)throw new Error(`Ollama gagal: ${response.status}`);const data=await response.json();return data.message?.content||local(message);
}
