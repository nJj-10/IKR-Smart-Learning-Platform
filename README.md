# IKR-Smart-Learning-Platform

Satu platform LMS TVET untuk Program Teknologi Komputer Rangkaian (IKR), dibina dengan React, Vite, Tailwind CSS, React Router, Node.js, Express dan Firebase.

## Fungsi

- Login dan register dengan role `student`, `lecturer`, `admin`
- Dashboard pelajar, pensyarah dan admin
- 12 modul IKR dengan topik dan progress
- Kuiz ABCD: random question, random answer, timer, auto-marking, result dan ranking
- AI Tutor: fallback tempatan serta pilihan Ollama
- Chat kelas, discussion room dan group menggunakan Realtime Database
- Pengumuman, rekod markah dan statistik
- Responsive serta dark/light mode

## Jalankan di VS Code

```bash
# Dari root projek
npm run install:all

# Terminal 1: frontend
npm run dev:frontend

# Terminal 2: backend AI (pilihan)
npm run dev:backend
```

Buka `http://localhost:5173`.

### Akaun demo

| Role | E-mel | Kata laluan |
|---|---|---|
| Pelajar | student@demo.ikr | demo123 |
| Pensyarah | lecturer@demo.ikr | demo123 |
| Admin | admin@demo.ikr | demo123 |

Tanpa `.env`, sistem terus berjalan dalam mod demo menggunakan localStorage.

## Sambungkan Firebase

1. Cipta projek Firebase dan Web App.
2. Aktifkan Authentication > Email/Password.
3. Aktifkan Firestore Database, Realtime Database dan Storage.
4. Salin `.env.example` kepada `frontend/.env` dan isi nilai `VITE_FIREBASE_*`.
5. Pasang Firebase CLI dan login.
6. Deploy rules:

```bash
firebase deploy --only firestore:rules,database,storage
```

Collection utama:

```text
users
courses
modules
quiz
results
chat
announcement
```

Chat sebenar disimpan dalam Realtime Database pada `chat/rooms/{roomId}/messages`.

## Import bank kuiz Jj-Quiz-TKR

Gunakan hanya jika anda mempunyai hak untuk menggunakan kandungan tersebut:

```bash
node scripts/import-jj-quiz.mjs /path/Jj-Quiz-TKR/index.html quiz-import.json
cd backend
npm install
GOOGLE_APPLICATION_CREDENTIALS=/path/service-account.json node ../scripts/seed-firestore.mjs ../quiz-import.json
```

## AI Tutor tanpa lesen komersial

Mod default ialah `AI_PROVIDER=local`. Untuk model tempatan:

```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen3:4b
```

Kunci atau servis AI tidak pernah diletakkan terus dalam frontend.

## Deployment GitHub Pages

1. Push folder ini ke repository GitHub.
2. Buka **Settings > Pages** dan pilih **GitHub Actions**.
3. Workflow `.github/workflows/deploy-pages.yml` akan membina `frontend`.
4. Tambahkan Firebase config sebagai GitHub Actions Secrets jika mahu mod sebenar.

GitHub Pages hanya mengehos frontend. Untuk AI berasaskan Express, deploy folder `backend` pada servis Node atau gunakan Firebase Functions. Mod AI tempatan masih berfungsi tanpa backend.

## Deployment Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

Konfigurasi `firebase.json` telah disediakan dan menggunakan `frontend/dist`.

## Struktur

```text
frontend/   React + Vite + Tailwind
backend/    Express AI API
firebase/   Firestore, Realtime Database dan Storage rules
scripts/    Import dan seed data
.github/    GitHub Pages workflow
```

Lihat `SOURCE_INTEGRATION.md` untuk matriks penyatuan tujuh sumber dan `THIRD_PARTY_LICENSES.md` untuk nota lesen.

## Akaun pensyarah dan admin dalam produksi

Untuk keselamatan, pendaftaran awam Firebase hanya mencipta role `student`. Akaun `lecturer` dan `admin` perlu diwujudkan oleh pentadbir menggunakan Firebase Authentication dan dokumen `users/{uid}` yang sesuai. Firestore Rules menghalang pengguna menukar role sendiri.
