// require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 10000;

// CORS configuration
app.use(cors({
    origin: '*',
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

// Route for generating categorized summary and searching for specific content using OpenAI API and other LLMs
app.post('/api/analyze-company-strategy', async (req, res) => {
  try {
    const { model, category, searchQuery, tickerSymbol } = req.body;

    const secUrl = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${tickerSymbol}&type=10-K&output=xml`;
    const secResponse = await axios.get(secUrl, {
      headers: {
        'User-Agent': 'MyAppName/1.0 (your-email@example.com)'
      }
    });

    const filingData = secResponse.data;

    if (!filingData) {
      return res.status(400).json({ error: 'No filing data found for the provided ticker symbol.' });
    }

    let categoryDescription;
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

    let response;
    if (model === 'gpt-4') {
      response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a financial analyst specialized in extracting insights from SEC filings." },
            { role: "user", content: prompt }
          ],
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } else if (model === 'claude-v1') {
      response = await axios.post(
        'https://api.anthropic.com/v1/complete',
        {
          prompt,
          model: 'claude-v1',
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } else if (model === 'cohere-command') {
      response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          prompt,
          model: 'command',
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Handle responses based on API used
    let summary = '';
    if (model === 'gpt-4') {
      summary = response.data.choices[0].message.content.trim();
    } else if (model === 'claude-v1') {
      summary = response.data.completion.trim();
    } else if (model === 'cohere-command') {
      summary = response.data.generations[0].text.trim();
    }

    res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error generating summary' });
  }
});

// Route for fetching company logo
app.get('/api/company-logo', async (req, res) => {
  try {
    const { ticker } = req.query;
    const domain = await getCompanyDomainFromTicker(ticker);
    const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : '';

    if (!logoUrl) {
      throw new Error(`No logo found for ticker ${ticker}`);
    }

    res.send({ logoUrl });
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
