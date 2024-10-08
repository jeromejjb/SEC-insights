<template>
  <div class="landing-page">
    <header>
      <img src="@/assets/v.png" alt="Logo" class="logo" />
      <h1>Enhance Your Commercial Awareness</h1>
      <p>AI-Driven Insights from SEC Filings at Your Fingertips</p>
    </header>

    <div class="search-section">
      <div class="dropdown-container">
        <div class="dropdown-wrapper">
          <select v-model="selectedCategory" class="styled-dropdown">
            <option value="Placeholder">Select a Category</option>
            <option value="ESG">ESG</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Future Sales Strategies">Future Sales Strategies</option>
            <option value="Future Products">Future Products</option>
          </select>
          <div class="dropdown-chevron">▼</div>
          <div class="info-icon" @mouseenter="showTooltip" @mouseleave="hideTooltip">
            <span>ℹ️</span>
            <div v-if="tooltipVisible" class="tooltip">
              <p>Select a category to tailor the analysis to specific areas like ESG, Sustainability, and more.</p>
            </div>
          </div>
        </div>
      </div>
      <input
        v-model="tickerSymbol"
        placeholder="Enter Ticker Symbol (e.g., AAPL)"
        @input="filterInput"
        @keypress="preventInvalidInput"
        @keyup.enter="searchCompany"
        class="search-input"
      />
      
     <!-- Model Selection Dropdown -->
     <div class="dropdown-container model-dropdown">
      <div class="dropdown-wrapper">
        <select v-model="selectedModel" class="styled-dropdown">
          <option value="Placeholder">Select a LLM</option>
          <option value="gpt-4">OpenAI GPT-4</option>
          <option value="claude-v1" disabled>Claude v1 (Coming Soon)</option>
          <option value="cohere-command" disabled>Cohere Command (Coming Soon)</option>
        </select>
        <div class="dropdown-chevron">▼</div>
      </div>
    </div>
      
      <button @click="searchCompany" class="search-button">Analyze Now</button>
    </div>

  
      <div class="features">
        <div class="feature-item">
          <h3>AI-Generated Summaries</h3>
          <p>Get concise and insightful summaries based on SEC filings.</p>
        </div>
        <div class="feature-item">
          <h3>In-Depth Analysis</h3>
          <p>Understand the company's strategies, ESG efforts, and more.</p>
        </div>
        <div class="feature-item">
          <h3>Easy to Use</h3>
          <p>Search by ticker symbol and get actionable insights instantly.</p>
        </div>
      </div>
  
      <!-- Horizontal Grid for ESG Companies -->
      <div class="esg-companies">
        <h2>Top 20 Companies Analyzed</h2>
        <div class="company-row">
          <div v-for="(company, index) in esgCompanies" :key="index" class="company-item">
            <img :src="company.logo" :alt="company.name" class="company-logo" />
            <p class="company-name">{{ company.name }}</p>
            <p class="company-ticker">{{ company.ticker }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-links">
          <router-link to="/privacy-policy">Privacy Policy</router-link>
          <router-link to="/careers">Join Our Team</router-link>
          <router-link to="/roadmap">Product Roadmap</router-link>
        </div>
        <div class="footer-info">
          <p>The information provided on this platform is for informational purposes only and does not constitute financial advice. Please consult a professional financial advisor before making any investment decisions.</p>
          <p>&copy; 2024 <a href="https://catalystlabs.io" target="_blank" rel="noopener noreferrer">Vereon - A Catalyst Labs Production</a>. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
      
  </template>
  
  <script>
  // import axios from 'axios';

export default {
  data() {
    return {
      tickerSymbol: '',
      selectedCategory: 'Placeholder', // Default category
      selectedModel: 'Placeholder', // Default model
      tooltipVisible: false,
      esgCompanies: [
        // Predefined company data with correct logo URLs
        { name: 'Apple', ticker: 'AAPL', logo: 'https://logo.clearbit.com/apple.com' },
        { name: 'Microsoft', ticker: 'MSFT', logo: 'https://logo.clearbit.com/microsoft.com' },
        { name: 'Nvidia', ticker: 'NVDA', logo: 'https://logo.clearbit.com/nvidia.com' },
        { name: 'Tesla', ticker: 'TSLA', logo: 'https://logo.clearbit.com/tesla.com' },
        { name: 'Alphabet', ticker: 'GOOGL', logo: 'https://logo.clearbit.com/abc.xyz' },
        { name: 'Amazon', ticker: 'AMZN', logo: 'https://logo.clearbit.com/amazon.com' },
        { name: 'Meta Platforms', ticker: 'META', logo: 'https://logo.clearbit.com/about.facebook.com' },
        { name: 'Johnson & Johnson', ticker: 'JNJ', logo: 'https://logo.clearbit.com/jnj.com' },
        { name: 'Visa', ticker: 'V', logo: 'https://logo.clearbit.com/visa.com' },
        { name: 'Procter & Gamble', ticker: 'PG', logo: 'https://logo.clearbit.com/pg.com' },
        { name: 'JPMorgan Chase', ticker: 'JPM', logo: 'https://logo.clearbit.com/jpmorganchase.com' },
        { name: 'Nestle', ticker: 'NSRGY', logo: 'https://logo.clearbit.com/nestle.com' },
        { name: 'Walmart', ticker: 'WMT', logo: 'https://logo.clearbit.com/walmart.com' },
        { name: 'Pfizer', ticker: 'PFE', logo: 'https://logo.clearbit.com/pfizer.com' },
        { name: 'UnitedHealth', ticker: 'UNH', logo: 'https://logo.clearbit.com/unitedhealthgroup.com' },
        { name: 'Chevron', ticker: 'CVX', logo: 'https://logo.clearbit.com/chevron.com' },
        { name: 'Exxon Mobil', ticker: 'XOM', logo: 'https://logo.clearbit.com/exxonmobil.com' },
        { name: 'Coca-Cola', ticker: 'KO', logo: 'https://logo.clearbit.com/coca-cola.com' },
        { name: 'PepsiCo', ticker: 'PEP', logo: 'https://logo.clearbit.com/pepsico.com' },
        { name: 'Walt Disney', ticker: 'DIS', logo: 'https://logo.clearbit.com/thewaltdisneycompany.com' }
      ],
    };
  },
    watch: {
selectedCategory(newCategory) {
('Selected Category:', newCategory);
// You can perform additional actions here when the category changes.
}
},

    methods: {
      formatTicker() {
        this.tickerSymbol = this.tickerSymbol.toUpperCase();
      },
      filterInput() {
      // Replace any non-letter character and convert to uppercase
      this.tickerSymbol = this.tickerSymbol.replace(/[^a-zA-Z]/g, '').toUpperCase();
    },
    preventInvalidInput(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[a-zA-Z]/.test(char)) {
        event.preventDefault();
      }
    },
      searchCompany() {
        if (this.tickerSymbol) {

          
          this.$router.push({
            name: 'CompanySearch',
            params: {
              ticker: this.tickerSymbol,
              category: this.selectedCategory,
              model: this.selectedModel,
            },
          });
        }
      },
      showTooltip() {
        this.tooltipVisible = true;
      },
      hideTooltip() {
        this.tooltipVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
/* Tablet Screens */
@media (max-width: 768px) {
  .search-section {
    flex-direction: column; /* Stack dropdown, search bar, and button vertically */
    align-items: stretch;
  }

  .dropdown-container {
    margin-right: 0; /* Remove margin when stacking */
    margin-bottom: 15px; /* Add spacing between stacked elements */
    width: 100%; /* Full width for dropdown */
  }

  .styled-dropdown {
    width: 100%; /* Full width dropdown */
    padding: 10px; /* Adjust padding for mobile */
    font-size: 16px; /* Adjust font size for readability */
  }

  .info-icon {
    font-size: 12px; /* Adjust icon size */
    margin-left: 5px; /* Slight margin adjustment */
  }

  .search-input {
    width: 100%; /* Full width search bar */
    margin-bottom: 15px; /* Add spacing below search bar */
    font-size: 16px; /* Adjust font size for readability */
    padding: 10px; /* Adjust padding for mobile */
  }

  .search-button {
    width: 100%; /* Full width button */
    padding: 12px; /* Adjust padding */
    font-size: 18px; /* Adjust font size for readability */
    margin-top: 10px; /* Add margin to create space between elements */
  }
}

/* Smaller Mobile Screens */
@media (max-width: 480px) {
  .search-section {
    flex-direction: column; /* Stack elements vertically */
    align-items: stretch;
  }

  .dropdown-container {
    margin-right: 0;
    margin-bottom: 10px; /* Smaller margin for more compact design */
    width: 100%; /* Full width for dropdown */
  }

  .styled-dropdown { 
    font-size: 22px; /* Further increase font size */
    padding: 14px 18px; /* Further increase padding */
  }

  .info-icon {
    font-size: 10px; /* Smaller icon size */
    margin-left: 5px;
  }

  .search-input {
    width: 100%; /* Full width search bar */
    margin-bottom: 10px; /* Smaller margin for compact layout */
    font-size: 14px; /* Adjust font size */
    padding: 8px; /* Adjust padding for smaller screens */
  }

  .search-button {
    width: 100%;
    padding: 10px; /* Adjust padding */
    font-size: 16px; /* Adjust font size */
  }
  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature-item {
    width: 100%; /* Full width for small screens */
    margin-bottom: 15px; /* Adjust spacing between items */
  }

  .feature-item:last-child {
    margin-bottom: 0; /* Remove margin from the last item */
  }
}

  .landing-page {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, #e0eafc, #cfdef3);
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
  .logo {
    width: 100px; /* Adjust the size as needed */
    margin-bottom: 20px;
  }
  /* Header Section */
  header {
    margin-bottom: 40px;
    color: #333;
  }
  
  h1 {
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 700;
    color: #2c3e50;
  }
  
  p {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 300;
  }
  
  /* Search Section */
  .search-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
  }
  
  .dropdown-container {
    position: relative;
    margin-right: 10px;
  }
  
  .dropdown-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .styled-dropdown {
    padding: 10px;
    font-size: 18px;
    border-radius: 8px;
    border: 2px solid #ccc;
    background-color: #fff;
    appearance: none;
    cursor: pointer;
    position: relative;
    padding-right: 30px; /* Space for chevron and info icon */
  }
  
  .styled-dropdown:focus {
    outline: none;
    border-color: #4caf50;
  }
  
  .dropdown-chevron {
    position: absolute;
    right: 40px;
    pointer-events: none;
    font-size: 14px;
    color: #3498db;
  }
  .model-dropdown .styled-dropdown {
    border: 2px solid #4caf50; /* Cool border */
    padding: 10px;
    font-size: 18px;
    border-radius: 8px;
    background-color: #fff;
    appearance: none;
    position: relative;
    padding-right: 30px; /* Space for chevron */
    cursor: pointer;
    transition: border-color 0.3s ease;
  }
  
  .model-dropdown .styled-dropdown:focus {
    border-color: #8e44ad;
  }
  
  .model-dropdown .dropdown-chevron {
    position: absolute;
    right: 10px;
    pointer-events: none;
    font-size: 14px;
    color: #4caf50;
  }
  
  
  .info-icon {
    cursor: pointer;
    font-size: 14px; /* Adjust size as needed */
    color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none; /* Remove background */
    border: none; /* Remove border */
    padding: 0; /* Remove padding */
    margin-left: 8px; /* Adjust to match the design */
    z-index: 1;
  }
  
  .tooltip {
    position: absolute;
    bottom: 150%;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    padding: 10px;
    background: #34495e;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    text-align: left;
    line-height: 1.5;
    z-index: 10;
  }
  
  .search-input {
    padding: 12px;
    font-size: 18px;
    width: 300px;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .search-button {
    padding: 12px 30px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #3498db, #8e44ad);
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .search-button:hover {
    transform: scale(1.05);
  }
  
  /* Features Section */
  .features {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
  
  .feature-item {
    max-width: 280px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .feature-item:hover {
    transform: translateY(-10px);
  }
  
  .feature-item h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  .feature-item p {
    font-size: 16px;
    color: #7f8c8d;
  }
  
  /* ESG Companies Section */
  .esg-companies {
    margin-top: 50px;
    padding: 20px 0;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .esg-companies h2 {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  .company-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  
  .company-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    text-align: center;
  }
  
  .company-logo {
    max-width: 80px;
    max-height: 80px;
    margin-bottom: 10px;
  }
  
  .company-name {
    font-size: 14px;
    font-weight: 500;
    color: #34495e;
    margin-bottom: 5px;
  }
  
  .company-ticker {
    font-size: 12px;
    color: #7f8c8d;
  }
  .site-footer {
    background-color: #4d6985; 
    color: #ffffff; 
    padding: 30px 20px;
    text-align: center;
    border-top: 3px solid #4d6985; 
    margin-top: 40px;
  }
  
  .footer-content {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px; 
    margin-bottom: 20px;
  }
  
  .footer-links a {
    color: #1d292b; 
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: #e67e22; 
  }
  
  .footer-info {
    font-size: 14px;
    line-height: 1.6;
  }
  
  .footer-info p {
    margin: 10px 0;
  }
  
  .footer-info a {
    color: #ecf0f1;
    text-decoration: underline;
  }
  
  .footer-info a:hover {
    color: #f39c12;
  }
  
  </style>
  