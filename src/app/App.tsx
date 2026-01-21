import { StockCalculator } from "@/app/components/StockCalculator";
import { TrendingUp } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 py-5 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur opacity-60"></div>
              <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Stock Returns Calculator</h1>
              <p className="text-xs text-gray-400">Calculate comprehensive investment returns</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        <StockCalculator />
      </main>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-400">
              © 2026 Stock Returns Calculator. Professional analytics.
            </p>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
