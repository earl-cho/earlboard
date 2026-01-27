import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black">
      <Navbar />
      <Dashboard />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-16 mt-20">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-xl font-black tracking-tighter text-slate-950 dark:text-white uppercase italic">
              BLOCKCHAIN <span className="text-blue-600">MONITOR</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">
              Digital Asset Market Intelligence & Institutional Insight
            </p>
          </div>
          <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">
            © 2026 Earlboard Research. Powered by Blackboard Intelligence.
          </p>
        </div>
      </footer>
    </main>
  );
}
