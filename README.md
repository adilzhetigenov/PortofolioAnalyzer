# Portfolio Risk Analytics Dashboard

A comprehensive React-based dashboard for portfolio monitoring and risk assessment with real-time data simulation.

## Features

- **Real-time Portfolio Monitoring**: Live updates every 5 seconds with simulated market data
- **Risk Analytics**: Advanced risk metrics including VaR, Sharpe Ratio, and volatility
- **Interactive Charts**: Performance tracking and asset allocation visualization
- **Portfolio Management**: Add/remove stocks with real-time calculations
- **Risk Alerts**: Configurable risk thresholds with visual warnings

## Project Structure

```
src/
├── components/
│   ├── PortfolioRiskDashboard.js    # Main dashboard component
│   ├── KeyMetrics.js                # Portfolio metrics cards
│   ├── RiskAlert.js                 # Risk warning component
│   ├── PortfolioCharts.js           # Charts and visualizations
│   ├── HoldingsTable.js             # Portfolio holdings table
│   └── AddStockForm.js              # Stock addition form
├── hooks/
│   ├── usePortfolioMetrics.js       # Portfolio calculations hook
│   └── useMarketData.js             # Market data simulation hook
├── utils/
│   └── stockUtils.js                # Utility functions
├── App.js                           # Main app component
└── index.js                         # App entry point
```

## Installation

### Option 1: Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Docker Development

1. Start development container with hot reloading:
```bash
npm run docker:dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Docker Production

1. Build and run production container:
```bash
npm run docker:prod
```

2. Open [http://localhost:80](http://localhost:80) in your browser.

### Docker Commands

```bash
# Development mode
npm run docker:dev

# Production mode
npm run docker:prod

# Stop containers
npm run docker:stop

# Clean up containers and volumes
npm run docker:clean

# Build production image manually
docker build -t portfolio-analyzer:latest .

# Run production container manually
docker run -p 8080:80 portfolio-analyzer:latest
```

## Dependencies

- **React 18**: Modern React with hooks
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework

## Docker Benefits

- **Consistent Environment**: Same behavior across development, staging, and production
- **Easy Deployment**: One command to deploy anywhere Docker runs
- **Isolation**: No conflicts with local system dependencies
- **Scalability**: Easy to scale horizontally with multiple containers
- **Portability**: Run on any platform that supports Docker

## Key Components

### PortfolioRiskDashboard
Main orchestrator component that manages state and coordinates all dashboard functionality.

### usePortfolioMetrics Hook
Custom hook that calculates:
- Portfolio value and weights
- Volatility and risk metrics
- Value at Risk (VaR)
- Sharpe Ratio
- Risk scoring

### useMarketData Hook
Simulates real-time market data updates with configurable volatility for different stocks.

## Risk Calculations

The dashboard implements several financial risk metrics:

- **Volatility**: Annualized standard deviation of returns
- **Value at Risk (VaR)**: 95% confidence interval for potential losses
- **Sharpe Ratio**: Risk-adjusted return measure
- **Risk Score**: Normalized risk level (1-10 scale)

## Customization

- Modify stock volatilities in `stockUtils.js`
- Adjust risk calculation parameters in `usePortfolioMetrics.js`
- Customize chart colors and styling in component files
- Update risk thresholds and alert conditions

## Future Enhancements

- Real API integration for live market data
- Additional risk metrics (Sortino ratio, maximum drawdown)
- Portfolio optimization suggestions
- Export functionality for reports
- Mobile-responsive design improvements
