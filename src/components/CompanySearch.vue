<template>
  <div class="company-search">
    <h2>Company Strategy for {{ tickerSymbol }} </h2>
    <div v-if="loading" class="loading-container">
      <div class="loading-bar-container">
        <div class="loading-bar"></div>
      </div>
      <p class="loading-message">Analyzing the latest SEC filings... Your insights are on the way!</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="logoUrl" class="company-logo">
      <img :src="logoUrl" alt="Company Logo" />
    </div>
    <div v-if="summary" class="summary">
      <div v-for="(item, index) in summaryItems" :key="index" class="summary-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
  <router-link class="search-button" to="/" style="text-decoration: none;">New Search</router-link>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tickerSymbol: this.$route.params.ticker,
      localSelectedCategory: this.$route.params.category || 'ESG',
      companyName: '',
      logoUrl: '',
      summary: '',
      loading: false,
      error: null,
    };
  },
  computed: {
    summaryItems() {
      return this.summary
        ? this.summary.split('\n').filter(item => item.includes(':')).map(item => {
            const [title, content] = item.split(': ');
            return { title: title?.trim() || 'Untitled', content: content?.trim() || '' };
          })
        : [];
    },
  },
  created() {
    this.fetchCompanyData();
    this.fetchCompanySearch();
  },
  methods: {
    async fetchCompanyData() {
      try {
        const response = await axios.get('https://sec-insights-rr90.onrender.com/api/company-logo', {
          params: { ticker: this.tickerSymbol },
        });
        this.companyName = response.data.companyName || this.tickerSymbol;
        this.logoUrl = response.data.logoUrl;
      } catch (error) {
        this.error = 'Error fetching the company logo.';
        console.error(error);
      }
    },
    async fetchCompanySearch() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('https://sec-insights-rr90.onrender.com/api/analyze-company-strategy', {
          tickerSymbol: this.tickerSymbol,
          category: this.localSelectedCategory,
          searchQuery: 'revenue',
        });
        this.summary = response.data.summary;
      } catch (error) {
        this.error = 'Error fetching the company strategy.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};

</script>



<style scoped>
/* Mobile-Friendly Adjustments */
@media (max-width: 768px) {
  .company-search {
    padding: 15px;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }

  .summary-item h3 {
    font-size: 20px;
  }

  .summary-item p {
    font-size: 14px;
  }

  .loading-message {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .company-search {
    padding: 10px;
    font-size: 12px;
  }

  h2 {
    font-size: 20px;
  }

  .summary-item h3 {
    font-size: 18px;
  }

  .summary-item p {
    font-size: 12px;
  }

  .loading-message {
    font-size: 14px;
  }
}

.company-search {
  font-family: 'Roboto', sans-serif; /* Apply the font here */
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.company-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.company-logo img {
  max-width: 150px;
  max-height: 150px;
  object-fit: contain;
  margin-right: 20px;
}

.company-details h3 {
  font-size: 24px;
  margin-bottom: 5px;
}

.company-details p {
  font-size: 16px;
}

.loading-container {
  text-align: center;
  margin: 30px 0;
}

.loading-bar-container {
  height: 4px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin: 20px 0;
}

.loading-bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  animation: loading 2s infinite;
}

.loading-message {
  font-size: 18px;
  color: #333;
  margin-top: 15px;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #ff6b6b;
}

.summary {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-item {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.summary-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.summary-item h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.summary-item p {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
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
</style>
