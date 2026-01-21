import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Calendar, TrendingUp, Search, Sparkles } from "lucide-react";
import { StockResults } from "@/app/components/StockResults";

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
  cash_balance: number;
  total_gain: number;
  gain_pct: number;
  corporate_actions: Array<{
    type: string;
    factor?: number;
    cash_received?: number;
  }>;
}

export function StockCalculator() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shares, setShares] = useState("100");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock function to simulate fetching stock data
  const fetchStockData = async (symbol: string, from: string, to: string, initialShares: number) => {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const mockData: Record<string, any> = {
      INFY: {
        symbol: "INFY",
        from,
        to,
        initial_shares: initialShares,
        final_shares: initialShares * 2,
        start_price: 1350.25,
        end_price: 1520.10,
        initial_value: 1350.25 * initialShares,
        final_value: 1520.10 * initialShares * 2 + 8000,
        cash_balance: 8000.0,
        total_gain: (1520.10 * initialShares * 2 + 8000) - (1350.25 * initialShares),
        gain_pct: 131.1,
        corporate_actions: [
          { type: "BONUS", factor: 2 },
          { type: "DIVIDEND_CASH", cash_received: 2000 },
          { type: "DIVIDEND_CASH", cash_received: 6000 }
        ]
      },
      AAPL: {
        symbol: "AAPL",
        from,
        to,
        initial_shares: initialShares,
        final_shares: initialShares,
        start_price: 150.25,
        end_price: 195.50,
        initial_value: 150.25 * initialShares,
        final_value: 195.50 * initialShares + 970,
        cash_balance: 970.0,
        total_gain: (195.50 * initialShares + 970) - (150.25 * initialShares),
        gain_pct: ((((195.50 * initialShares + 970) - (150.25 * initialShares)) / (150.25 * initialShares)) * 100),
        corporate_actions: [
          { type: "DIVIDEND_CASH", cash_received: 240 },
          { type: "DIVIDEND_CASH", cash_received: 240 },
          { type: "DIVIDEND_CASH", cash_received: 240 },
          { type: "DIVIDEND_CASH", cash_received: 250 }
        ]
      },
      TSLA: {
        symbol: "TSLA",
        from,
        to,
        initial_shares: initialShares,
        final_shares: initialShares * 3,
        start_price: 245.80,
        end_price: 312.40,
        initial_value: 245.80 * initialShares,
        final_value: 312.40 * initialShares * 3,
        cash_balance: 0,
        total_gain: (312.40 * initialShares * 3) - (245.80 * initialShares),
        gain_pct: ((((312.40 * initialShares * 3) - (245.80 * initialShares)) / (245.80 * initialShares)) * 100),
        corporate_actions: [
          { type: "BONUS", factor: 3 }
        ]
      },
      MSFT: {
        symbol: "MSFT",
        from,
        to,
        initial_shares: initialShares,
        final_shares: initialShares,
        start_price: 380.50,
        end_price: 425.75,
        initial_value: 380.50 * initialShares,
        final_value: 425.75 * initialShares + 3080,
        cash_balance: 3080.0,
        total_gain: (425.75 * initialShares + 3080) - (380.50 * initialShares),
        gain_pct: ((((425.75 * initialShares + 3080) - (380.50 * initialShares)) / (380.50 * initialShares)) * 100),
        corporate_actions: [
          { type: "DIVIDEND_CASH", cash_received: 750 },
          { type: "DIVIDEND_CASH", cash_received: 750 },
          { type: "DIVIDEND_CASH", cash_received: 750 },
          { type: "DIVIDEND_CASH", cash_received: 830 }
        ]
      },
      GOOGL: {
        symbol: "GOOGL",
        from,
        to,
        initial_shares: initialShares,
        final_shares: initialShares * 2,
        start_price: 142.30,
        end_price: 168.90,
        initial_value: 142.30 * initialShares,
        final_value: 168.90 * initialShares * 2,
        cash_balance: 0,
        total_gain: (168.90 * initialShares * 2) - (142.30 * initialShares),
        gain_pct: ((((168.90 * initialShares * 2) - (142.30 * initialShares)) / (142.30 * initialShares)) * 100),
        corporate_actions: [
          { type: "BONUS", factor: 2 }
        ]
      },
    };

    const upperSymbol = symbol.toUpperCase();
    if (mockData[upperSymbol]) {
      return mockData[upperSymbol];
    }

    const startPrice = 100 + Math.random() * 100;
    const endPrice = startPrice + (Math.random() * 50) - 10;
    const cashBalance = Math.random() * 5000;
    const initialValue = startPrice * initialShares;
    const finalValue = endPrice * initialShares + cashBalance;
    const totalGain = finalValue - initialValue;
    
    return {
      symbol: upperSymbol,
      from,
      to,
      initial_shares: initialShares,
      final_shares: initialShares,
      start_price: startPrice,
      end_price: endPrice,
      initial_value: initialValue,
      final_value: finalValue,
      cash_balance: cashBalance,
      total_gain: totalGain,
      gain_pct: (totalGain / initialValue) * 100,
      corporate_actions: [
        { type: "DIVIDEND_CASH", cash_received: cashBalance / 2 },
        { type: "DIVIDEND_CASH", cash_received: cashBalance / 2 }
      ]
    };
  };

  const calculateReturns = async () => {
    if (!stockSymbol || !startDate || !endDate) {
      alert("Please fill in all required fields");
      return;
    }

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    if (startDateTime >= endDateTime) {
      alert("End date must be after start date");
      return;
    }

    setIsCalculating(true);

    try {
      const stockData = await fetchStockData(stockSymbol, startDate, endDate, parseFloat(shares));
      setResults(stockData);
    } catch (error) {
      alert("Error calculating returns. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const quickFillDates = (months: number) => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);
    
    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-2xl shadow-blue-500/20 bg-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
        
        <CardHeader className="relative border-b border-white/10 pb-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-white">
            Calculate Returns
          </CardTitle>
          <p className="text-gray-400 mt-2">
            Enter your investment details to see comprehensive returns including dividends and corporate actions
          </p>
        </CardHeader>
        
        <CardContent className="relative pt-8 pb-8">
          <div className="space-y-8">
            {/* Stock Symbol and Shares */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="stock-symbol" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-400" />
                  Stock Symbol
                </Label>
                <Input
                  id="stock-symbol"
                  placeholder="e.g., AAPL, MSFT, INFY"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                  className="h-14 text-base font-medium border-2 border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all bg-white/5 backdrop-blur-sm px-4 placeholder:text-gray-500 text-white"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="shares" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  Number of Shares
                </Label>
                <Input
                  id="shares"
                  type="number"
                  placeholder="100"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  min="0.01"
                  step="0.01"
                  className="h-14 text-base font-medium border-2 border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all bg-white/5 backdrop-blur-sm px-4 placeholder:text-gray-500 text-white"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>Investment Period</span>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="start-date" className="text-sm font-medium text-gray-400">
                    From Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="h-14 text-base border-2 border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all bg-white/5 backdrop-blur-sm px-4 text-white"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="end-date" className="text-sm font-medium text-gray-400">
                    To Date
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="h-14 text-base border-2 border-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all bg-white/5 backdrop-blur-sm px-4 text-white"
                  />
                </div>
              </div>

              {/* Quick Date Selection */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl">
                <Label className="text-xs font-semibold text-gray-400 mb-3 block">
                  QUICK SELECT
                </Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '6M', months: 6 },
                    { label: '1Y', months: 12 },
                    { label: '2Y', months: 24 },
                    { label: '3Y', months: 36 },
                    { label: '5Y', months: 60 }
                  ].map((period) => (
                    <Button
                      key={period.label}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => quickFillDates(period.months)}
                      className="h-10 px-4 border-2 border-white/20 hover:border-blue-500 hover:bg-blue-500/20 hover:text-blue-300 font-medium transition-all rounded-lg bg-white/5 text-gray-300"
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Stocks */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-400 mb-3">
                TRY SAMPLE STOCKS
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { symbol: 'INFY', name: 'Infosys' },
                  { symbol: 'AAPL', name: 'Apple' },
                  { symbol: 'MSFT', name: 'Microsoft' },
                  { symbol: 'TSLA', name: 'Tesla' },
                  { symbol: 'GOOGL', name: 'Google' }
                ].map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => setStockSymbol(stock.symbol)}
                    className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 text-white text-sm font-medium"
                  >
                    {stock.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-4">
              <Button
                onClick={calculateReturns}
                disabled={isCalculating}
                className="relative w-full h-16 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 rounded-xl overflow-hidden group border-0"
              >
                {!isCalculating && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                )}
                {isCalculating ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent" />
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    <span>Calculate Returns</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {results && <StockResults results={results} />}
    </div>
  );
}
