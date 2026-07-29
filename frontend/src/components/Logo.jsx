export default function Logo({ compact = false, darkText = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-tech-500 to-cyan-400 font-black text-white shadow-lg shadow-tech-500/20">IKR</div>
      {!compact && (
        <div>
          <div className={`font-extrabold leading-tight ${darkText ? "text-navy-900 dark:text-white" : "text-white"}`}>Smart Learning</div>
          <div className={`text-[10px] font-semibold uppercase tracking-[.18em] ${darkText ? "text-slate-500 dark:text-blue-200" : "text-blue-200"}`}>TVET Networking</div>
        </div>
      )}
    </div>
  );
}
