import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import stockList from '@/data/nse_equities.json'

type Stock = {
  symbol: string
  name: string
}

interface StockSymbolInputProps {
  value: string
  onSelect: (stock: Stock) => void
  label?: string
}

export default function StockSymbolInput({
  value,
  onSelect,
  label = 'Stock Symbol',
}: StockSymbolInputProps) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Stock[]>([])
  const [open, setOpen] = useState(false)
  const [hasSelected, setHasSelected] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)

  // Sync with parent
  useEffect(() => {
    setQuery(value)
  }, [value])

  // Filter stocks
  useEffect(() => {
    if (!query.trim() || hasSelected) {
      setResults([])
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    const q = query.toUpperCase()

    const filtered = (stockList as Stock[])
      .filter(
        s =>
          s.symbol.includes(q) ||
          s.name.toUpperCase().includes(q)
      )
      .slice(0, 8)

    setResults(filtered)
    setOpen(true)
    setActiveIndex(-1)
  }, [query, hasSelected])

  // Outside click close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (stock: Stock) => {
    setQuery(stock.symbol)
    setHasSelected(true)
    setOpen(false)
    setActiveIndex(-1)
    onSelect(stock)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      handleSelect(results[activeIndex])
    }

    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <Label className="text-gray-300 flex gap-2 items-center mb-2">
        <Search className="h-4 w-4 text-blue-400" />
        {label}
      </Label>

      <Input
        value={query}
        onChange={e => {
          setHasSelected(false)
          setQuery(e.target.value.toUpperCase())
        }}
        onKeyDown={handleKeyDown}
        placeholder="INFY, TCS, RELIANCE"
        className="h-14 bg-white/5 text-white"
      />

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl  bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl max-h-72 overflow-y-auto">
          {results.length > 0 ? (
            results.map((stock, index) => (
              <div
                key={stock.symbol}
                onClick={() => handleSelect(stock)}
                className={`px-4 py-3 cursor-pointer transition ${
                  index === activeIndex
                    ? 'bg-blue-500/30'
                    : 'hover:bg-blue-500/10'
                }`}
              >
                <div className="text-sm font-bold text-white">
                  {stock.symbol}
                </div>
                <div className="text-xs text-gray-400">
                  {stock.name}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
