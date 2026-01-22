import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Gift, Coins, BarChart3, PieChart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CalculationResults {
  symbol: string;
  from: string;
  to: string;

  initial_shares: number;
  final_shares: number;

  start_price: number;
  end_price: number;

  initial_value: number;
  final_value: number;

  price_gain: number;
  price_gain_pct: number;

  dividend_gain: number;

  total_gain: number;
  total_gain_pct: number;

  corporate_actions: {
    date: string;
    type: string;
    dividend_per_share?: number;
    cash_received?: number;
    total_cash?: number;
  }[];
}


interface StockResultsProps {
  results: CalculationResults;
}

export function StockResults({ results }: StockResultsProps) {
  const isPositive = results.total_gain >= 0;

  // Generate chart data
  const chartData = [
    {
      name: "Initial",
      value: results.initial_value,
      label: new Date(results.from).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    },
    {
      name: "Final",
      value: results.final_value,
      label: new Date(results.to).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    },
  ];

  // Separate corporate actions by type
  const bonusActions = results.corporate_actions.filter(action => action.type === "BONUS");
  const dividendActions = results.corporate_actions.filter(action => action.type === "DIVIDEND_CASH");

  // Calculate breakdown
const stockValueGain = results.price_gain;
  const cashGain = results.dividend_gain;

  // Calculate annualized return
  const startDate = new Date(results.from);
  const endDate = new Date(results.to);
  const daysDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const years = daysDiff / 365.25;
  const annualizedReturn = (Math.pow(results.final_value / results.initial_value, 1 / years) - 1) * 100;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Card */}
      <Card className="border-0 shadow-2xl shadow-blue-500/20 bg-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        <CardHeader className="relative border-b border-white/10 pb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur opacity-60"></div>
                <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                  <Activity className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                  {results.symbol}
                </CardTitle>
                <p className="text-sm text-gray-400 mt-1 font-medium">
                  {new Date(results.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
                  {' → '}
                  {new Date(results.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <Badge 
              variant={isPositive ? "default" : "destructive"}
              className={`text-base px-5 py-2.5 font-bold shadow-lg border-0 ${
                isPositive 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700' 
                  : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
              }`}
            >
              {isPositive ? (
                <><TrendingUp className="h-4 w-4 mr-2" strokeWidth={2.5} /> Profit</>
              ) : (
                <><TrendingDown className="h-4 w-4 mr-2" strokeWidth={2.5} /> Loss</>
              )}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative border-0 shadow-xl shadow-emerald-500/10 bg-white/10 backdrop-blur-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 group-hover:from-emerald-500/20 group-hover:to-green-500/20 transition-all"></div>
          <CardContent className="relative pt-6 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl blur opacity-50"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isPositive ? '+' : ''}{results.total_gain_pct.toFixed(1)}%
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Gain</div>
            <div className={`text-2xl md:text-3xl font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
              ₹{Math.abs(results.total_gain).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>

        <Card className="group relative border-0 shadow-xl shadow-blue-500/10 bg-white/10 backdrop-blur-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all"></div>
          <CardContent className="relative pt-6 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur opacity-50"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Percent className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300">
                Total
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Return %</div>
            <div className={`text-2xl md:text-3xl font-bold ${isPositive ? "text-blue-400" : "text-red-400"}`}>
              {results.total_gain_pct.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="group relative border-0 shadow-xl shadow-purple-500/10 bg-white/10 backdrop-blur-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all"></div>
          <CardContent className="relative pt-6 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur opacity-50"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300">
                CAGR
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Annualized</div>
            <div className={`text-2xl md:text-3xl font-bold ${isPositive ? "text-purple-400" : "text-red-400"}`}>
              {annualizedReturn.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="group relative border-0 shadow-xl shadow-slate-500/10 bg-white/10 backdrop-blur-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-slate-700/10 group-hover:from-slate-500/20 group-hover:to-slate-700/20 transition-all"></div>
          <CardContent className="relative pt-6 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl blur opacity-50"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl shadow-lg">
                  <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/20 text-slate-300">
                Now
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Final Value</div>
            <div className="text-2xl md:text-3xl font-bold text-white">
              ₹{results.final_value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Details */}
      <Card className="border-0 shadow-xl shadow-slate-500/10 bg-white/10 backdrop-blur-2xl">
        <CardHeader className="border-b border-white/10 pb-6">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            Investment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Initial Shares', value: results.initial_shares.toLocaleString('en-IN') },
              { label: 'Final Shares', value: results.final_shares.toLocaleString('en-IN') },
              { label: 'Share Multiplier', value: `${(results.final_shares / results.initial_shares).toFixed(2)}x` },
              { label: 'Start Price', value: `₹${results.start_price.toFixed(2)}` },
              { label: 'End Price', value: `₹${results.end_price.toFixed(2)}` },
              { label: 'Price Change', value: `${((results.end_price - results.start_price) / results.start_price * 100).toFixed(2)}%` },
              { label: 'Initial Investment', value: `₹${results.initial_value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` },
              { label: 'Stock Value (Final)', value: `₹${(results.end_price * results.final_shares).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` },
              { label: 'Cash Balance', value: `₹${results.dividend_gain.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` },
            ].map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-xl font-bold text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Corporate Actions */}
      {results.corporate_actions.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {bonusActions.length > 0 && (
            <Card className="border-0 shadow-xl shadow-orange-500/10 bg-white/10 backdrop-blur-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>
              <CardHeader className="relative border-b border-white/10 pb-5">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-white">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg blur opacity-50"></div>
                    <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-lg">
                      <Gift className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  Bonus/Stock Splits
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pt-6 pb-6">
                <div className="space-y-3">
                  {bonusActions.map((action, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <span className="text-sm font-medium text-gray-300">Split Ratio</span>
                      <span className="text-lg font-bold text-orange-400">{action.factor}:1</span>
                    </div>
                  ))}
                  <div className="pt-3 mt-3 border-t border-white/10">
                    <div className="flex justify-between items-center py-3 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <span className="text-sm font-semibold text-gray-300">Total Multiplier</span>
                      <span className="text-xl font-bold text-emerald-400">
                        {(results.final_shares / results.initial_shares).toFixed(2)}x
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {dividendActions.length > 0 && (
            <Card className="border-0 shadow-xl shadow-emerald-500/10 bg-white/10 backdrop-blur-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
              <CardHeader className="relative border-b border-white/10 pb-5">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-white">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg blur opacity-50"></div>
                    <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg">
                      <Coins className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  Dividend Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pt-6 pb-6">
                <div className="space-y-3">
                  {dividendActions.map((action, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <span className="text-sm font-medium text-gray-300">Payment #{index + 1}</span>
                      <span className="text-lg font-bold text-emerald-400">
                        ₹{action.cash_received?.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 mt-3 border-t border-white/10">
                    <div className="flex justify-between items-center py-3 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <span className="text-sm font-semibold text-gray-300">Total Dividends</span>
                      <span className="text-xl font-bold text-emerald-400">
                        ₹{results.dividend_gain.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Return Breakdown */}
      <Card className="border-0 shadow-xl shadow-slate-500/10 bg-white/10 backdrop-blur-2xl">
        <CardHeader className="border-b border-white/10 pb-6">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
            <PieChart className="h-6 w-6 text-blue-400" />
            Return Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-300">Stock Value Appreciation</span>
                <span className="text-xl font-bold text-white">
                  ₹{stockValueGain.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg"
                  style={{ width: `${Math.min(Math.abs((stockValueGain / results.total_gain) * 100), 100)}%` }}
                />
              </div>
              <div className="text-xs font-medium text-gray-500 text-right mt-2">
                {((stockValueGain / results.total_gain) * 100).toFixed(1)}% of total gain
              </div>
            </div>

            {results.dividend_gain > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-gray-300">Cash Dividends</span>
                  <span className="text-xl font-bold text-emerald-400">
                    ₹{cashGain.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg"
                    style={{ width: `${(cashGain / results.total_gain) * 100}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-500 text-right mt-2">
                  {((cashGain / results.total_gain) * 100).toFixed(1)}% of total gain
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className="border-0 shadow-xl shadow-slate-500/10 bg-white/10 backdrop-blur-2xl">
        <CardHeader className="border-b border-white/10 pb-6">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            Portfolio Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#6366f1" : "#ef4444"} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={isPositive ? "#6366f1" : "#ef4444"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="label" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                stroke="rgba(255,255,255,0.2)"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                stroke="rgba(255,255,255,0.2)"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, 'Portfolio Value']}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                  color: '#fff'
                }}
                labelStyle={{ color: '#fff', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#6366f1" : "#ef4444"}
                strokeWidth={3}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
