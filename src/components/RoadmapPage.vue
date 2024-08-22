<template>
    <div class="roadmap-page">
        <router-link class="search-button" to="/" style="text-decoration: none;">Home</router-link>

      <header>
        <h1>Product Roadmap</h1>
        <p>Explore the upcoming features and improvements planned for our AI-driven SEC filings analysis platform.</p>
      </header>
  
      <div class="roadmap-container">
        <div class="roadmap-item">
          <div class="roadmap-icon">
          </div>
          <font-awesome-icon :icon="['fat', 'rocket']" />  
          <div class="roadmap-content">
            <h2>V1.0 - Launch</h2>
            <ul>
              <li>Core SEC filing analysis feature</li>
              <li>Integration with OpenAI GPT-4 for financial insights</li>
              <li>User authentication and secure login</li>
              <li>Company logo and data retrieval from external APIs</li>
            </ul>
            <p class="status completed">Status: Completed</p>
          </div>
        </div>
  
        <div class="roadmap-item">
          <div class="roadmap-icon">
         </div>
            <font-awesome-icon :icon="['fas', 'arrow-up-right-dots']" />
          <div class="roadmap-content">
            <h2>V1.1 - Expansion</h2>
            <ul>
              <li>Added support for additional LLMs (Claude, Cohere Command)</li>
              <li>Enhanced analysis depth with customizable prompts for ESG, Sustainability, and more</li>
              <li>Improved user interface with modern design and animations</li>
              <li>Initial performance optimization for faster analysis</li>
            </ul>
            <p class="status in-progress">Status: In Progress</p>
          </div>
        </div>
  
        <div class="roadmap-item">
          <div class="roadmap-icon">
            <font-awesome-icon :icon="['fas', 'earth-europe']" />
          </div>
          <div class="roadmap-content">
            <h2>V1.2 - Future Expansion</h2>
            <ul>
              <li>Coverage of additional stock exchanges globally</li>
              <li>Advanced analysis for predicting future market trends</li>
              <li>Customizable dashboards for enterprise clients</li>
              <li>AI-driven investment recommendations based on deep analysis</li>
              <li>Automated ESG and Financial Reporting using Gen AI</li>
            </ul>
            <p class="status planned">Status: Planned</p>
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
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  export default {
    components: {
    FontAwesomeIcon,
  },
    name: 'RoadmapPage',
  };
  </script>
  
  <style scoped>
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
  .roadmap-page {
    padding: 40px;
    background-color: #f0f4ff;
  }
  
  header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  h1 {
    font-size: 36px;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 18px;
    color: #7f8c8d;
  }
  
  .roadmap-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .roadmap-item {
    display: flex;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .roadmap-icon {
    flex-shrink: 0;
    margin-right: 20px;
  }
  
  .roadmap-icon img {
    width: 50px;
    height: 50px;
  }
  
  .roadmap-content {
    flex-grow: 1;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #34495e;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 10px 0;
  }
  
  li {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 5px;
    line-height: 1.6;
  }
  
  .status {
    font-weight: bold;
    color: #27ae60;
  }
  
  .completed {
    color: #27ae60;
  }
  
  .in-progress {
    color: #f39c12;
  }
  
  .planned {
    color: #2980b9;
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
  