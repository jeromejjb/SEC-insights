<template>
    <div class="careers-page">
      <header class="hero-section">
        <router-link class="search-button" to="/" style="text-decoration: none;">Home</router-link>
        <h1>Join Our Team</h1>
        <p>Work with brilliant minds on challenges that matter.</p>
      </header>
  
      <section class="why-work-with-us">
        <h2>Why Work With Us?</h2>
        <p>
          At Vereon, we believe that the best work happens when you’re surrounded by people who inspire you. Our team is passionate about solving real-world problems that make a difference. Whether it's innovating in AI-driven insights or enhancing global sustainability efforts, we work together to tackle the challenges that matter most. Join us in our mission to make the world a better place.
        </p>
      </section>
  
      <section class="current-openings">
        <h2>Current Openings</h2>
        <p>Explore our exciting opportunities below and apply to become part of our dynamic team!</p>
        <div class="job-cards">
          <div class="job-card">
            <h3>Software Engineer Intern</h3>
            <p>Collaborate with our engineering team to develop scalable, AI-driven solutions that push the boundaries of technology.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSend1UeYG3lw78pnlWUTq6Bh3LY4jB12H1-vxunQqi1Pn_uKA/viewform" target="_blank" class="apply-button">Apply Now</a>
          </div>
          <div class="job-card">
            <h3>UX/UI Design Intern</h3>
            <p>Create engaging and user-centric designs that make complex data accessible and intuitive for our users.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSend1UeYG3lw78pnlWUTq6Bh3LY4jB12H1-vxunQqi1Pn_uKA/viewform" target="_blank" class="apply-button">Apply Now</a>
          </div>
          <div class="job-card">
            <h3>Data Scientist Intern</h3>
            <p>Leverage data science to generate actionable insights and contribute to strategies that drive impactful decisions.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSend1UeYG3lw78pnlWUTq6Bh3LY4jB12H1-vxunQqi1Pn_uKA/viewform" target="_blank" class="apply-button">Apply Now</a>
          </div>
          <div class="job-card">
            <h3>Relationship Manager Intern</h3>
            <p>Build and nurture key relationships that align with our growth strategies and client success initiatives.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSend1UeYG3lw78pnlWUTq6Bh3LY4jB12H1-vxunQqi1Pn_uKA/viewform" target="_blank" class="apply-button">Apply Now</a>
          </div>
        </div>
      </section>
      
  
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
  export default {
    name: 'CareersPage',
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
  .careers-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #2c3e50;
  }
  
  .hero-section {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, #e0eafc, #cfdef3);
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .hero-section h1 {
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 700;
    color: #2c3e50;
  }
  
  .hero-section p {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 300;
  }
  
  .why-work-with-us {
    padding: 40px 20px;
    text-align: center;
    background-color: #f5f5f5;
    margin-top: 30px;
    border-radius: 8px;
  }
  
  .why-work-with-us h2 {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .why-work-with-us p {
    font-size: 18px;
    line-height: 1.6;
    color: #34495e;
  }
  
  .current-openings {
    padding: 40px 20px;
    text-align: center;
  }
  
  .current-openings h2 {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .current-openings p {
    font-size: 18px;
    margin-bottom: 40px;
    color: #34495e;
  }
  
  .job-cards {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .job-card {
    width: 250px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    text-align: left;
  }
  
  .job-card:hover {
    transform: translateY(-10px);
  }
  
  .job-card h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .job-card p {
    font-size: 16px;
    margin-bottom: 20px;
    color: #7f8c8d;
  }
  
  .apply-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(135deg, #3498db, #8e44ad);
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    transition: background 0.3s ease;
  }
  
  .apply-button:hover {
    background: linear-gradient(135deg, #8e44ad, #3498db);
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
  