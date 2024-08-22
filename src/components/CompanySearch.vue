<template>
  <div class="company-search">
    <h2>Company Strategy for {{ tickerSymbol }}</h2>

    <!-- Loading Animation -->
    <div v-if="loading" class="loading-container">
      <div class="loading-bar-container">
        <div class="loading-bar"></div>
      </div>
      <p class="loading-message">Analyzing the latest SEC filings... Your insights are on the way!</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <!-- Company Logo -->
    <div v-if="logoUrl" class="company-logo">
      <img :src="logoUrl" alt="Company Logo" />
    </div>

    <!-- Word Cloud -->
    <div v-if="wordCloudData.length" class="word-cloud">
      <h3>Key Themes</h3>
      <div id="word-cloud"></div>
    </div>

    <!-- Summarized Information -->
    <div v-if="summaryItems.length" class="summary">
      <h3>Summary Information</h3>
      <div v-for="(item, index) in summaryItems" :key="index" class="summary-item">
        <h4>{{ item.title }}</h4>
        <p>{{ item.content }}</p>
      </div>
    </div>

    <!-- Key Performance Indicators (Charts) -->
    <div v-if="chartsData.length" class="charts">
      <h3>Key Performance Indicators</h3>
      <div v-for="chart in chartsData" :key="chart.id" class="chart-container">
        <canvas :id="chart.id"></canvas>
      </div>
    </div>

    <!-- Quotes from Filings -->
    <div v-if="quotes.length" class="quotes">
      <h3>Direct Quotes from Filings</h3>
      <blockquote v-for="(quote, index) in quotes" :key="index" class="quote-item">
        "{{ quote }}"
      </blockquote>
    </div>

    <!-- Navigation Button -->
    <router-link class="search-button" to="/" style="text-decoration: none;">New Search</router-link>
  </div>

 
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
import WordCloud from 'wordcloud';

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
      chartsData: [],
      wordCloudData: [],
      quotes: [],
    };
  },
  computed: {
    summaryItems() {
      return this.summary
        ? this.summary.split('\n').filter(item => item.includes(':')).map(item => {
            const [title, content] = item.split(': ');
            return { title: title?.trim() || 'Untitled', content: content?.trim() || '' };
          }).filter(item => item.content !== '')  // Remove empty content
        : [];
    },
  },
  mounted() {
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
        this.summary = response.data.summary || '';
        if (response.data.kpiData) {
          this.generateCharts(response.data.kpiData);
        }
        if (response.data.wordCloud) {
          this.generateWordCloud(response.data.wordCloud);
        }
        this.quotes = response.data.quotes || [];
      } catch (error) {
        this.error = 'Error fetching the company strategy.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    generateCharts(kpiData) {
      this.chartsData = kpiData.map((kpi, index) => {
        const chartId = `chart-${index}`;
        this.renderChart(chartId, kpi);
        return { id: chartId, data: kpi };
      });
    },
    renderChart(id, data) {
      const ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: data.label,
            data: data.values,
            backgroundColor: '#3498db',
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });
    },
    generateWordCloud(wordData) {
      WordCloud(document.getElementById('word-cloud'), {
        list: wordData,
        gridSize: Math.round(16 * window.innerWidth / 1024),
        weightFactor: function (size) {
          return Math.pow(size, 2.3) * window.innerWidth / 1024;
        },
        fontFamily: 'Roboto, sans-serif',
        color: '#3498db',
        backgroundColor: '#ffffff',
        rotateRatio: 0.5,
        rotationSteps: 2,
        shape: 'circle',
      });
    }
  },
};
</script>

<style scoped>
.company-search {
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.company-logo img {
  max-width: 150px;
  margin: 20px auto;
  display: block;
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

.summary, .charts, .quotes, .word-cloud {
  margin-top: 30px;
}

.summary-item, .quote-item {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.summary-item h4, .quote-item {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
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
  display: block;
  margin: 30px auto 0;
  text-align: center;
}

.search-button:hover {
  transform: scale(1.05);
}

.chart-container {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .company-search {
    padding: 15px;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }

  .summary-item h4, .quote-item {
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

  .summary-item h4, .quote-item {
    font-size: 14px;
  }

  .search-button {
    width: 100%;
  }
}
</style>
