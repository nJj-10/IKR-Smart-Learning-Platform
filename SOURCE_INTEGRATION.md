# Integrasi tujuh projek sumber

Projek ini ialah implementasi baharu yang menyatukan fungsi dalam satu seni bina. Ia tidak menjalankan tujuh aplikasi asal secara berasingan.

| Sumber | Fungsi yang diadaptasi | Cara integrasi |
|---|---|---|
| Jj-Quiz-TKR | MCQ, rawak, timer, auto-marking, keputusan, ranking | Enjin React baharu; importer berasingan disediakan |
| eModul-IKR | Katalog, topik, progress, PDF/video | Komponen React moden dan Firestore |
| Open Tutor AI | Chat AI, history, recommendation | Express provider + fallback tempatan/Ollama |
| LearnHouse | Course management dan dashboard | Aliran UI dan data ditulis semula |
| Chatwoot | Conversation dan notification | Konsep sahaja |
| Rocket.Chat | Room, group dan role | Realtime Database |
| LMS | Role dan dashboard | AuthContext dan role routes |

## Perbezaan kod modul
Sumber kuiz menamakan `Network Documentation` sebagai **IKR3082**, sedangkan arahan projek menetapkan **IKR3083**. Platform memaparkan IKR3083 dan menyimpan `sourceCode: IKR3082` untuk audit.
