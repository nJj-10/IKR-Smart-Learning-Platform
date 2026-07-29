export const AI_KNOWLEDGE = [
  { keywords: ["osi", "layer"], title: "Model OSI", answer: "Model OSI membahagikan komunikasi rangkaian kepada tujuh lapisan: Physical, Data Link, Network, Transport, Session, Presentation dan Application. Gunakan model ini untuk mengenal pasti lokasi sesuatu masalah, contohnya kabel pada Layer 1, MAC/VLAN pada Layer 2 dan IP/routing pada Layer 3." },
  { keywords: ["tcp/ip", "tcp", "ip model"], title: "Model TCP/IP", answer: "Model TCP/IP lazimnya diterangkan melalui empat lapisan: Network Access, Internet, Transport dan Application. IP bekerja pada lapisan Internet, manakala TCP dan UDP bekerja pada lapisan Transport." },
  { keywords: ["ip address", "alamat ip", "ipv4"], title: "Alamat IP", answer: "Alamat IPv4 mempunyai 32 bit dan dibahagikan kepada empat oktet. Subnet mask menentukan bahagian network dan host. Peranti dalam subnet yang sama boleh berkomunikasi terus; trafik ke subnet lain dihantar ke default gateway." },
  { keywords: ["subnet", "host"], title: "Subnetting", answer: "Untuk menentukan subnet, kenal pasti bilangan host diperlukan, tambah dua alamat untuk network dan broadcast, kemudian pilih bilangan bit host yang mencukupi. Contoh 30 host memerlukan 32 alamat, jadi prefix yang sesuai ialah /27 dan 30 alamat boleh digunakan." },
  { keywords: ["vlan", "trunk"], title: "VLAN", answer: "VLAN membahagikan satu switch kepada beberapa rangkaian logikal dan mengecilkan domain broadcast. Access port membawa satu VLAN untuk peranti hujung, manakala trunk membawa beberapa VLAN antara switch atau ke router." },
  { keywords: ["routing", "router", "static route"], title: "Routing", answer: "Routing memilih laluan antara rangkaian IP. Router menggunakan routing table. Static route dimasukkan secara manual, manakala dynamic routing menggunakan protokol untuk mempelajari laluan." },
  { keywords: ["packet tracer", "cisco"], title: "Cisco Packet Tracer", answer: "Dalam Packet Tracer, bina topologi, tetapkan alamat IP, aktifkan interface dengan no shutdown, semak menggunakan show ip interface brief dan uji dengan ping. Troubleshooting perlu dibuat lapisan demi lapisan." },
  { keywords: ["security", "firewall", "keselamatan"], title: "Network Security", answer: "Keselamatan rangkaian merangkumi kawalan akses, firewall, segmentasi, kemas kini, kata laluan kukuh, logging dan prinsip least privilege. Elakkan Telnet dan utamakan protokol selamat seperti SSH." },
];

export function localTutorAnswer(message) {
  const text = message.toLowerCase();
  const match = AI_KNOWLEDGE.find((item) => item.keywords.some((keyword) => text.includes(keyword)));
  return match?.answer || "Saya boleh membantu tentang OSI, TCP/IP, alamat IP, subnetting, VLAN, routing, Cisco Packet Tracer dan keselamatan rangkaian. Nyatakan topik atau masalah konfigurasi yang sedang berlaku.";
}
