# Analisis tujuh projek sumber

## Prinsip penyatuan

Ketujuh-tujuh projek menggunakan seni bina yang berlainan. Platform akhir tidak mencantumkan `index.html`, tidak menjalankan tujuh backend, dan tidak mengekalkan tujuh sistem login. Semua fungsi disatukan dalam React/Vite, Express dan Firebase.

## 1. Jj-Quiz-TKR

- Bentuk asal: HTML, CSS dan JavaScript dalam satu halaman.
- Fungsi dikenal pasti: soalan ABCD, rawak soalan, rawak jawapan, auto-marking dan rekod percubaan.
- Kekurangan: timer sebenar dan ranking agregat belum lengkap.
- Integrasi: enjin kuiz React baharu menyediakan timer, keputusan dan ranking. Importer menukar `QUIZ_DATA` kepada rekod Firestore.

## 2. eModul-IKR

- Bentuk asal: React + Vite + Tailwind.
- Kandungan sebenar yang ditemui: IKR3013 dan IKR3023.
- Fungsi: topik, nota, video/pautan, kuiz topik dan progress localStorage.
- Integrasi: katalog 12 modul, topik, progress berasaskan pengguna, tempat PDF/video dan upload pensyarah.
- Jurang sumber: nota penuh bagi IKR3033 hingga IKR3133 tidak terdapat dalam eModul yang diberikan.

## 3. Open Tutor AI

- Bentuk asal: frontend Svelte/SvelteKit dan backend Python/FastAPI dengan RAG serta pelbagai provider.
- Integrasi: konsep sejarah soalan, system prompt dan provider abstraction ditulis semula dalam Express.
- Mod tersedia: jawapan tempatan tanpa API dan Ollama sebagai pilihan.

## 4. LearnHouse LMS

- Fungsi rujukan: course management, dashboard pelajar/pensyarah dan learning progress.
- Teknologi asal tidak serasi secara terus dengan sasaran.
- Integrasi: aliran kursus, progress dan dashboard sahaja; kod sumber tidak disalin.

## 5. Chatwoot

- Sistem asal ialah customer support berskala besar.
- Konsep relevan: conversation list, timestamp, status dan notification.
- Integrasi: pengalaman chat ringkas dalam React dan Firebase Realtime Database.

## 6. Rocket.Chat

- Sistem asal ialah monorepo komunikasi lengkap.
- Konsep relevan: room, group, role dan mesej masa nyata.
- Integrasi: tiga room contoh serta struktur `chat/rooms/{roomId}/messages`.

## 7. LMS

- Fungsi rujukan: role pelajar/pensyarah/admin, courses, dashboard, resources dan result.
- Teknologi asal menggunakan React/Firebase generasi lama.
- Integrasi: AuthContext, route mengikut role dan dashboard moden.

## Pertindihan yang dibuang

- Enam sistem login diganti dengan satu Firebase Authentication.
- Beberapa dashboard diganti dengan satu layout dan route berdasarkan role.
- Database projek asal diganti dengan Firestore/Realtime Database.
- Chatwoot dan Rocket.Chat tidak dijalankan sebagai server kedua.
- AI Tutor tidak membawa masuk backend Python asal.

## Jurang dan keputusan data

Sumber kuiz menggunakan kod `IKR3082` untuk Network Documentation, sementara brief menetapkan `IKR3083`. Sistem akhir memaparkan `IKR3083` tetapi menyimpan `sourceCode: IKR3082` untuk kebolehkesanan.
