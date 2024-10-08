const express = require('express');
const { resolve } = require('path');
let cors = require('cors');


const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

const stocks = [
  { id: 1, name: 'Stock A', price: 100 },
  { id: 2, name: 'Stock B', price: 50 },
  { id: 3, name: 'Stock C', price: 150 },
  { id: 4, name: 'Stock D', price: 75 }
];

// Define the endpoint
app.get('/stocks/sort/pricing', (req, res) => {
  // Get the sorting condition from the query parameter
  const pricing = req.query.pricing;

  // Sort the stocks based on the pricing condition
  const sortedStocks = stocks.sort((a, b) => {
      return pricing === 'low-to-high' ? a.price - b.price : b.price - a.price;
  });

  // Send the sorted stocks as a JSON response
  res.json(sortedStocks);
});


// Sample stock data with growth rates
const stocks2 = [
  { id: 1, name: 'Stock A', growthRate: 10.5 },
  { id: 2, name: 'Stock B', growthRate: 3.2 },
  { id: 3, name: 'Stock C', growthRate: 15.0 },
  { id: 4, name: 'Stock D', growthRate: 7.8 }
];

// Define the endpoint
app.get('/stocks/sort/growth', (req, res) => {
  // Get the sorting condition from the query parameter
  const growth = req.query.growth;

  
  // Sort the stocks based on the growth condition
  const sortedStocks = stocks2.sort((a, b) => {
      return growth === 'low-to-high' ? a.growthRate - b.growthRate : b.growthRate - a.growthRate;
  });

  // Send the sorted stocks as a JSON response
  res.json(sortedStocks);
});


// Sample stock data with exchange information
const stocks3 = [
  { id: 1, name: 'Stock A', exchange: 'NSE' },
  { id: 2, name: 'Stock B', exchange: 'BSE' },
  { id: 3, name: 'Stock C', exchange: 'NSE' },
  { id: 4, name: 'Stock D', exchange: 'BSE' }
];

// Function to filter stocks by exchange
const filterByExchange = (exchange) => {
  return stocks3.filter(stock => stock.exchange.toLowerCase() === exchange.toLowerCase());
};

// Define the endpoint
app.get('/stocks/filter/exchange', (req, res) => {
  // Get the exchange parameter from the query
  const exchange = req.query.exchange;

  // Validate the exchange parameter
  if (!exchange) {
    return res.status(400).json({ error: 'Exchange parameter is required.' });
}

if (exchange.toLowerCase() !== 'nse' && exchange.toLowerCase() !== 'bse') {
    return res.status(400).json({ error: 'Invalid exchange parameter. Use "NSE" or "BSE".' });
}
  // Filter stocks by the selected exchange
  const filteredStocks = filterByExchange(exchange);

  // Send the filtered stocks as a JSON response
  res.json(filteredStocks);
});


// Sample stock data with industry information
const stocks4 = [
  { id: 1, name: 'Stock A', industry: 'Finance' },
  { id: 2, name: 'Stock B', industry: 'Pharma' },
  { id: 3, name: 'Stock C', industry: 'Power' },
  { id: 4, name: 'Stock D', industry: 'Finance' },
  { id: 5, name: 'Stock E', industry: 'Pharma' }
];

// Function to filter stocks by industry
const filterByIndustry = (industry) => {
  return stocks4.filter(stock => stock.industry.toLowerCase() === industry.toLowerCase());
};

// Define the endpoint
app.get('/stocks/filter/industry', (req, res) => {
  // Get the industry parameter from the query
  const industry = req.query.industry;

  // Validate the industry parameter
  if (!industry) {
      return res.status(400).json({ error: 'Industry parameter is required.' });
  }

  const validIndustries = ['finance', 'pharma', 'power'];

  if (!validIndustries.includes(industry.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid industry parameter. Use "Finance", "Pharma", or "Power".' });
  }

  // Filter stocks by the selected industry
  const filteredStocks = filterByIndustry(industry);

  // Send the filtered stocks as a JSON response
  res.json(filteredStocks);
});

// Sample stock data
const stocks5 = [
  { id: 1, name: 'Stock A', industry: 'Finance' },
  { id: 2, name: 'Stock B', industry: 'Pharma' },
  { id: 3, name: 'Stock C', industry: 'Power' },
  { id: 4, name: 'Stock D', industry: 'Finance' },
  { id: 5, name: 'Stock E', industry: 'Pharma' }
];

// Define the endpoint to get all stocks
app.get('/stocks', (req, res) => {
  // Send all stocks as a JSON response
  res.json(stocks5);
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
