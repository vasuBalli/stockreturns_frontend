import { TrendingUp, Shield, Zap, BarChart3, Calculator, Globe } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Calculator,
      title: "Advanced Calculations",
      description: "Comprehensive return analysis including dividends, splits, and bonus shares with real-time precision.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Beautiful charts and graphs to visualize your investment growth and performance over time.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "CAGR Analysis",
      description: "Calculate annualized returns (CAGR) to understand long-term investment performance accurately.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Shield,
      title: "Accurate Data",
      description: "Bank-grade accuracy for all calculations with support for corporate actions and adjustments.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant calculations powered by optimized algorithms for seamless user experience.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Multi-Market",
      description: "Support for stocks from various markets with proper currency and split handling.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="relative py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-400">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional tools designed for serious investors who demand accuracy and insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl blur-xl transition-all duration-500"></div>
              
              {/* Card */}
              <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                  <div className={`relative flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
            <span className="text-sm text-gray-300">Want to see more?</span>
            <a href="#calculator" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Try the calculator →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
