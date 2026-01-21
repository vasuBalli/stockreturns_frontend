# Stock Returns Calculator

A modern, professional stock returns calculator built with React, TypeScript, and Tailwind CSS. Features comprehensive analytics including dividends, stock splits, bonus shares, and CAGR calculations.

## 🎨 Design Features

- **Dark Theme**: Premium dark background (#0a0a1f) with subtle gradient effects
- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Animated Background**: Floating gradient orbs with smooth animations
- **Modern UI Components**: Cards, badges, charts with custom styling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Fade-in, slide-in, and hover effects

## 📁 Project Structure (Next.js Style)

```
/src
  /app
    App.tsx                    # Main application component
    /components
      Hero.tsx                 # Landing hero section
      Features.tsx             # Features showcase section
      StockCalculator.tsx      # Investment calculator form
      StockResults.tsx         # Results display component
      /ui                      # Reusable UI components
        badge.tsx
        button.tsx
        card.tsx
        input.tsx
        label.tsx
  /styles
    fonts.css                  # Font imports
    globals.css                # Global styles
    theme.css                  # Theme variables and animations
```

## 🚀 Features

### Calculator Features
- **Stock Symbol Search**: Enter any stock ticker
- **Date Range Selection**: Pick custom or quick-select periods (6M, 1Y, 2Y, 3Y, 5Y)
- **Share Quantity**: Calculate returns for any number of shares
- **Corporate Actions**: Automatic handling of:
  - Bonus issues / Stock splits
  - Cash dividends
  
### Analytics Displayed
- **Total Gain**: Absolute profit/loss in currency
- **Return Percentage**: Total return as percentage
- **CAGR**: Compound Annual Growth Rate
- **Final Portfolio Value**: Current worth
- **Investment Summary**: Detailed breakdown of all metrics
- **Return Breakdown**: Visual breakdown of gains (stock vs dividends)
- **Portfolio Growth Chart**: Interactive area chart

## 🎯 API Integration

Replace the `fetchStockData` function in `StockCalculator.tsx` with your backend API:

```typescript
const fetchStockData = async (symbol: string, from: string, to: string, initialShares: number) => {
  const response = await fetch(`/api/stock-returns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, from, to, initial_shares: initialShares })
  });
  
  return await response.json();
};
```

### Expected API Response Format

```json
{
  "symbol": "AAPL",
  "from": "2023-01-01",
  "to": "2024-01-01",
  "initial_shares": 100,
  "final_shares": 100,
  "start_price": 150.25,
  "end_price": 195.50,
  "initial_value": 15025.00,
  "final_value": 20520.00,
  "cash_balance": 970.00,
  "total_gain": 5495.00,
  "gain_pct": 36.59,
  "corporate_actions": [
    { "type": "DIVIDEND_CASH", "cash_received": 240 },
    { "type": "BONUS", "factor": 2 }
  ]
}
```

## 🎨 Color Palette

- **Primary**: Blue to Purple gradient (#3b82f6 → #a855f7)
- **Success**: Emerald to Green (#10b981 → #22c55e)
- **Background**: Dark Navy (#0a0a1f)
- **Text**: White (#ffffff) and Gray shades
- **Accents**: Context-specific (Blue, Purple, Orange, etc.)

## 🔧 Technologies

- **React 18.3**: Modern React with hooks
- **TypeScript**: Type-safe code
- **Tailwind CSS v4**: Utility-first styling
- **Recharts**: Interactive charts
- **Lucide React**: Modern icon library
- **Vite**: Fast build tool

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌟 Components

### Hero Component
Landing section with:
- Animated badge
- Large heading with gradient text
- CTA buttons
- Statistics grid
- Floating decorative elements

### Features Component
6 feature cards showcasing:
- Advanced Calculations
- Visual Analytics
- CAGR Analysis
- Accurate Data
- Lightning Fast
- Multi-Market Support

### StockCalculator Component
Input form with:
- Stock symbol search
- Share quantity input
- Date range picker with quick selects
- Sample stock buttons
- Animated calculate button

### StockResults Component
Comprehensive results display:
- Header with profit/loss badge
- 4 key metric cards
- Investment summary grid
- Corporate actions cards
- Return breakdown with progress bars
- Interactive portfolio growth chart

## 🎭 Animations

Custom keyframe animations:
- `animate-float`: 20s smooth floating
- `animate-float-delayed`: 25s delayed floating
- `animate-float-slow`: 30s slow floating
- Fade-in/slide-in on mount
- Hover effects on all interactive elements

## 📝 Sample Stocks

Pre-configured mock data for:
- INFY (Infosys)
- AAPL (Apple)
- MSFT (Microsoft)
- TSLA (Tesla)
- GOOGL (Google)

## 🔐 Notes

- Currently uses mock data for demonstration
- Replace `fetchStockData` function with real API
- All calculations are client-side for demo purposes
- Smooth scroll to results after calculation

---

Built with ❤️ for investors who demand accuracy and insights.
