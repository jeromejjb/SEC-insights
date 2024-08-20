// require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: '*',
    // origin: [
    //     'https://sec-strategy-app.vercel.app', // Primary Vercel domain
    //     'https://sec-strategy-lz9cmh2hu-jeromes-projects-f2caa689.vercel.app', // Alternative Vercel domain
    //     'https://sec-insights-rr90.onrender.com' // Render backend domain
    // ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Proxy route for SEC API requests
app.get('/api/sec-proxy', async (req, res) => {
  try {
    const { CIK, type } = req.query;
    const secUrl = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${CIK}&type=${type}&output=xml`;

    const response = await axios.get(secUrl, {
      headers: {
        'User-Agent': 'MyAppName/1.0 (your-email@example.com)' // Replace with your app's name and contact info
      }
    });

    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data from SEC:', error);
    res.status(500).send('Error fetching data from SEC');
  }
});

// Route for generating categorized summary and searching for specific content using OpenAI API
app.post('/api/analyze-company-strategy', async (req, res) => {
    console.log('Request received for /api/analyze-company-strategy with data:', req.body);
    try {
      const { filingData, category, searchQuery } = req.body;
  
      // Generate a dynamic prompt based on the selected category
      let categoryDescription = '';
  
      switch (category) {
        case 'ESG':
          categoryDescription = 'focusing on the company\'s Environmental, Social, and Governance (ESG) initiatives, including specific sustainability goals, diversity metrics, and governance structures.';
          break;
        case 'Sustainability':
          categoryDescription = 'highlighting the company\'s sustainability practices, such as reducing carbon emissions, waste management, renewable energy adoption, and specific environmental metrics.';
          break;
        case 'Future Sales Strategies':
          categoryDescription = 'emphasizing future sales strategies, market expansion plans, projected revenue growth, sales metrics, and any market share goals.';
          break;
        case 'Future Products':
          categoryDescription = 'identifying future product launches, innovations, technological advancements, research and development metrics, and market penetration strategies.';
          break;
        default:
          categoryDescription = 'focusing on key strategic initiatives, goals, financial metrics, and company performance indicators.';
      }
  
      const prompt = `
        Based on the following SEC filing data, provide a detailed analysis of the company's future strategies and directions related to "${category}".
        Focus on ${categoryDescription}.
        Include relevant financial metrics, projections, and key performance indicators (KPIs). Search for specific quotes or sayings related to "${searchQuery}", and identify any significant numbers, actions, or strategic initiatives mentioned in the filing.
  
        Filing Data: ${filingData}
      `;
  
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a financial analyst specialized in extracting insights from SEC filings." },
            { role: "user", content: prompt }
          ],
          max_tokens: 2000, // Increased token limit for more detailed responses
          temperature: 0.5,
          top_p: 0.9,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      res.json({ summary: openaiResponse.data.choices[0].message.content.trim() });
    } catch (error) {
      console.error('Error generating summary:', error.response ? error.response.data : error.message);
      res.status(500).send('Error generating summary');
    }
  });
  
  
  app.get('/api/company-logo', async (req, res) => {
    try {
      const { ticker } = req.query;
      let domain = await getCompanyDomainFromTicker(ticker);
      let companyName = '';  // Placeholder for company name
      let websiteUrl = domain ? `https://${domain}` : '';
  
      if (!domain) {
        // Extract domain from SEC filing or fallback to pre-mapped data
        // Add logic to extract company name if available
      }
  
      const logoUrl = `https://logo.clearbit.com/${domain}`;
  
      if (!logoUrl) {
        throw new Error(`No logo found for ticker ${ticker}`);
      }
  
      res.send({ logoUrl, companyName, websiteUrl });
    } catch (error) {
      console.error('Error fetching company logo:', error.message);
      res.status(500).send('Error fetching company logo');
    }
  });

  
  

// Function to get the company domain from ticker symbol (simplified for this example)
async function getCompanyDomainFromTicker(ticker) {
  const mockData = {
    AAPL: 'apple.com',
    MSFT: 'microsoft.com',
    QQQ: 'invesco.com' // Example for a mutual fund or ETF
  };
  return mockData[ticker] || null;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
