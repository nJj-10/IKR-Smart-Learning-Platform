import { useMemo, useState } from "react";
import { localTutorAnswer } from "../data/aiKnowledge.js";
import PageHeader from "../components/PageHeader.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const starter = [
  "Terangkan Model OSI dengan mudah",
  "Bagaimana kira subnet untuk 30 host?",
  "Apa beza access port dan trunk port?",
  "Langkah asas troubleshoot ping gagal",
];

export default function AITutor() {
  const { user } = useAuth();
  const key = `ikr-ai-history-${user.uid}`;
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem(key) || "[]"));
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const api = import.meta.env.VITE_API_URL;

  async function ask(text = input) {
    if (!text.trim() || busy) return;
    const userMsg = { role: "user", content: text.trim(), time: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);

    let content;
    try {
      if (api) {
        const res = await fetch(`${api}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: next.slice(-8) }),
        });
        if (!res.ok) throw new Error("API tidak tersedia");
        content = (await res.json()).answer;
      } else {
        content = localTutorAnswer(text);
      }
    } catch {
      content = `${localTutorAnswer(text)}\n\n(Mod bantuan tempatan digunakan kerana backend AI tidak dapat dicapai.)`;
    }

    const final = [...next, { role: "assistant", content, time: Date.now() }];
    setMessages(final);
    localStorage.setItem(key, JSON.stringify(final));
    setBusy(false);
  }

  const recommendation = useMemo(
    () =>
      messages.length < 2
        ? "Mulakan dengan topik OSI, IP Address dan subnetting sebelum VLAN dan routing."
        : "Ulang kaji topik yang paling banyak anda tanyakan, kemudian cuba kuiz modul berkaitan.",
    [messages.length],
  );

  return (
    <>
      <PageHeader
        eyebrow="AI Tutor"
        title="Pembantu pembelajaran rangkaian"
        description="Mod tempatan tersedia tanpa servis AI berbayar. Backend juga menyokong Ollama melalui konfigurasi pilihan."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <section className="panel flex min-h-[600px] flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {!messages.length && (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-tech-500/10 text-2xl">AI</div>
                  <h2 className="mt-4 text-xl font-black">Apa yang mahu dipelajari?</h2>
                  <p className="mt-2 text-sm text-slate-500">Tanya dalam Bahasa Melayu tentang rangkaian komputer.</p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={`${message.time}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${
                    message.role === "user" ? "bg-tech-600 text-white" : "bg-slate-100 dark:bg-white/10"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {busy && <div className="text-sm text-slate-500">AI Tutor sedang menyusun jawapan…</div>}
          </div>
          <div className="border-t border-slate-200 p-4 dark:border-white/10">
            <div className="flex gap-2">
              <textarea
                className="input min-h-12 resize-none"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    ask();
                  }
                }}
                placeholder="Taip soalan anda…"
              />
              <button className="btn-primary" onClick={() => ask()} disabled={busy}>Hantar</button>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="panel p-5">
            <h3 className="font-black">Cadangan soalan</h3>
            <div className="mt-3 space-y-2">
              {starter.map((question) => (
                <button key={question} onClick={() => ask(question)} className="w-full rounded-xl border border-slate-200 p-3 text-left text-sm hover:border-tech-500 dark:border-white/10">
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <h3 className="font-black">Learning recommendation</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{recommendation}</p>
          </div>
          <button
            className="btn-secondary w-full"
            onClick={() => {
              setMessages([]);
              localStorage.removeItem(key);
            }}
          >
            Padam sejarah
          </button>
        </aside>
      </div>
    </>
  );
}
