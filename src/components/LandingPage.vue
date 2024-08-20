<template>
    <div class="landing-page">
      <header>
        <h1>Enhance Your Commercial Awareness</h1>
        <p>AI-Driven Insights from SEC Filings at Your Fingertips</p>
      </header>
  
      <div class="search-section">
        <div class="dropdown-container">
          <div class="dropdown-wrapper">
            <select v-model="selectedCategory" class="styled-dropdown">
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
          <p>
            The information provided on this platform is for informational purposes only and does not constitute financial advice. Please consult a professional financial advisor before making any investment decisions.
          </p>
          <p>&copy; 2024 A Catalyst Labs Production. All rights reserved.</p>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
        </div>
      </footer>
      
  </template>
  
  <script>
  export default {
    data() {
      return {
        tickerSymbol: '',
        selectedCategory: 'ESG', // Default category
        tooltipVisible: false,
        esgCompanies: [
          { name: 'Apple', ticker: 'AAPL', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
          { name: 'Microsoft', ticker: 'MSFT', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
          { name: 'Nvidia', ticker: 'NVDA', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Nvidia_logo.svg' },
          { name: 'Tesla', ticker: 'TSLA', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
          { name: 'Alphabet', ticker: 'GOOGL', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
          { name: 'Amazon', ticker: 'AMZN', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
          { name: 'Meta Platforms', ticker: 'META', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta_Platforms_Inc._logo.svg' },
          { name: 'Johnson & Johnson', ticker: 'JNJ', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Johnson_and_Johnson_logo.svg' },
          { name: 'Visa', ticker: 'V', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Visa_Inc._logo.svg' },
          { name: 'Procter & Gamble', ticker: 'PG', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Procter_%26_Gamble_logo.svg' },
          { name: 'JPMorgan Chase', ticker: 'JPM', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/JPMorgan_Chase_and_Co_logo.svg' },
          { name: 'Nestle', ticker: 'NSRGY', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Nestle_logo.svg' },
          { name: 'Walmart', ticker: 'WMT', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
          { name: 'Pfizer', ticker: 'PFE', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Pfizer_logo.svg' },
          { name: 'UnitedHealth', ticker: 'UNH', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/UnitedHealth_Group_logo.svg' },
          { name: 'Chevron', ticker: 'CVX', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Chevron_logo.svg' },
          { name: 'Exxon Mobil', ticker: 'XOM', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/ExxonMobil_logo.svg' },
          { name: 'Coca-Cola', ticker: 'KO', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Coca-Cola_logo.svg' },
          { name: 'PepsiCo', ticker: 'PEP', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/PepsiCo_logo.svg' },
          { name: 'Walt Disney', ticker: 'DIS', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Walt_Disney_Studios_Motion_Pictures_Logo.svg' },
        ],
      };
    },
    watch: {
selectedCategory(newCategory) {
console.log('Selected Category:', newCategory);
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
          // Pass selected category and ticker as route parameters
          this.$router.push({
            name: 'CompanySearch',
            params: {
              ticker: this.tickerSymbol,
              category: this.selectedCategory,
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
  /* General Page Layout */
  .landing-page {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, #e0eafc, #cfdef3);
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
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
    background-color: #f9f9f9;
    padding: 20px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    margin-top: 40px;
  }
  
  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    font-size: 14px;
    color: #666;
  }
  
  .footer-content p {
    margin-bottom: 10px;
  }
  
  .footer-content a {
    color: #007BFF;
    text-decoration: none;
  }
  
  .footer-content a:hover {
    text-decoration: underline;
  }
  
  </style>
  