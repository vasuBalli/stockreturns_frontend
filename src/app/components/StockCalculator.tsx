"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Calendar, TrendingUp, Search, Sparkles } from "lucide-react";
import { StockResults } from "@/app/components/StockResults";
import StockSymbolInput from '@/app/components/StockSymbolInput'


/* ---------------- TYPES ---------------- */

interface CorporateAction {
  date?: string;
  type: string;
  factor?: number;
  dividend_per_share?: number;
  cash_received?: number;
  total_cash?: number;
  shares_before?: number;
  shares_after?: number;
}

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
  corporate_actions: CorporateAction[];
}

/* ---------------- COMPONENT ---------------- */

export function StockCalculator() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockName, setStockName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shares, setShares] = useState("1");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  /* ---------------- API CALL ---------------- */

  const fetchStockData = async (
    symbol: string,
    from: string,
    to: string,
    initialShares: number
  ): Promise<CalculationResults> => {
    const params = new URLSearchParams({
      symbol: symbol.toUpperCase(),
      from,
      to,
      shares: initialShares.toString(),
      dividend_mode: "reinvest",
    });

    const response = await fetch(
      `https://stockreturns.in/api/returns/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  };

  /* ---------------- CALCULATE ---------------- */

  const calculateReturns = async () => {
    if (!stockSymbol || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert("End date must be after start date");
      return;
    }

    setIsCalculating(true);
    setResults(null);

    try {
      const data = await fetchStockData(
        stockSymbol,
        startDate,
        endDate,
        parseFloat(shares)
      );
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch stock data");
    } finally {
      setIsCalculating(false);
    }
  };

  /* ---------------- QUICK DATE ---------------- */

  const quickFillDates = (months: number) => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);

    setEndDate(end.toISOString().split("T")[0]);
    setStartDate(start.toISOString().split("T")[0]);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">

      <Card className="border-0 shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-indigo-500/10
 backdrop-blur-1xl overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-2xl text-white">
            Calculate Returns
          </CardTitle>
          <p className="text-gray-400">
            Includes dividends, bonus & splits
          </p>
        </CardHeader>

        <CardContent className="pt-8 space-y-8">

          {/* SYMBOL + SHARES */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              {/* <Label className="text-gray-300 flex gap-2 items-center">
                <Search className="h-4 w-4 text-blue-400" />
                Stock Symbol
              </Label> */}
              {/* <Input
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                placeholder="INFY, TCS, RELIANCE"
                className="h-14 bg-white/5 text-white"
              /> */}
              <StockSymbolInput
  value={stockSymbol}
  onSelect={(stock) => {
    setStockSymbol(stock.symbol)
    setStockName(stock.name)
  }}
/>

            </div>

            <div>
              <Label className="text-gray-300 flex gap-2 items-center">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Shares
              </Label>
              <Input
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="h-14 bg-white/5 text-white"
              />
            </div>

          </div>

          {/* DATES */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <Label className="text-gray-400">From</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-14 bg-white/5 text-white"
              />
            </div>

            <div>
              <Label className="text-gray-400">To</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-14 bg-white/5 text-white"
              />
            </div>

          </div>

          {/* QUICK BUTTONS */}
          <div className="flex gap-2 flex-wrap">
            {[6, 12, 24, 36, 60].map((m) => (
              <Button
                key={m}
                variant="outline"
                onClick={() => quickFillDates(m)}
              >
                {m / 12}Y
              </Button>
            ))}
          </div>

          {/* CALCULATE */}
          <Button
            onClick={calculateReturns}
            disabled={isCalculating}
            className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {isCalculating ? "Calculating..." : "Calculate Returns"}
          </Button>

        </CardContent>
      </Card>

      {/* RESULTS */}
      {results && <StockResults results={results} />}

    </div>
  );
}
