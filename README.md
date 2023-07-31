# BitDegeree Task - Gas Tracker

## Overview
Gas Tracker is a web application built using Vue.js and ApexCharts.js that allows users to monitor gas prices on the Ethereum network. The application displays real-time gas metrics, such as low, average, and high gas prices, base price, priority price, and the total cost in USD. Additionally, the app provides historical data for low, average, and high gas prices over different timeframes, represented by an interactive line chart.

## Features

- Real-time gas metrics: Low, average, and high gas prices, base price, priority price, and total cost in USD are displayed on the dashboard.
- Interactive line chart: The line chart showcases historical data for low, average, and high gas prices over different timeframes (7, 30, and 90 days).
- Timeframe switchers: Users can toggle between 7-, 30-, and 90-day timeframes to view gas price trends over different periods.

## Getting Started

### Prerequisites
- Node.js and npm are required to run the project. Make sure they are installed on your system.

### Installation
1. Clone the repository: `git clone https://github.com/lram91/gas-tracker.git`
2. Navigate to the project directory: `cd gas-tracker`
3. Install dependencies: `npm install`

### Usage
1. Start the development server: `npm run dev`
2. Open your browser and visit `http://localhost:8080` to access the Gas Tracker app.

### Note
For this example, the gas metrics are currently hardcoded for demonstration purposes. In a real product, these metrics would be fetched from a backend server via API calls.

## Libraries/Frameworks Used

- Vue.js: A progressive JavaScript framework for building user interfaces.
- ApexCharts.js: A modern charting library that provides interactive and responsive charts for visualizing data.
