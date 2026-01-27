import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black">
      <Dashboard />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 mt-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
            © 2026 Earlboard Research. Powered by Blackboard Intelligence.
          </p>
        </div>
      </footer>
    </main>
  );
}
