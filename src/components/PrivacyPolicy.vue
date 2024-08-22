<template>
    <div class="privacy-policy">
      <router-link class="search-button" to="/" style="text-decoration: none;">Home</router-link>

      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> August 19, 2024</p>
      <p>Welcome to Catalyst Labs. We respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you interact with our services.</p>
      
      <h2>1. Introduction</h2>
      <p>At Catalyst Labs, we prioritize your privacy. This document explains the information we collect, how we use it, and the measures we take to protect your personal data.</p>
  
      <h2>2. Information We Collect</h2>
      <p>We may collect personal information such as your name, email address, and other details you provide when interacting with our services.</p>
  
      <h2>3. How We Use Your Information</h2>
      <p>Your information is used to provide and improve our services, communicate with you, and ensure compliance with legal obligations.</p>
  
      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell your personal information. We may share data with trusted third parties who help us operate our services, under strict confidentiality agreements.</p>
  
      <h2>5. Data Security</h2>
      <p>We implement robust security measures to protect your information from unauthorized access, alteration, or disclosure.</p>
  
      <h2>6. Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information. Contact us at any time to exercise these rights.</p>
  
      <h2>7. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar technologies to enhance your experience on our site. You can manage your cookie preferences through your browser settings.</p>
  
      <h2>8. Changes to this Policy</h2>
      <p>We may update this Privacy Policy periodically. We will notify you of significant changes and update the effective date above.</p>
  
      <h2>9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p><strong>Catalyst Labs</strong></p>
      <p>Email: <a href="mailto:jeromejb@uwalumni.com">jeromejb@uwalumni.com</a></p>
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
  export default {
    name: "PrivacyPolicy",
  };
  </script>
  
  <style scoped>
  .search-button {
    padding: 12px 30px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    background: black;
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .search-button:hover {
    transform: scale(1.05);
  }
  .privacy-policy {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
    font-family: 'Roboto', sans-serif;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .privacy-policy h1, .privacy-policy h2 {
    color: #333;
    margin-bottom: 10px;
  }
  
  .privacy-policy p {
    color: #555;
    margin-bottom: 15px;
  }
  
  .privacy-policy a {
    color: #007bff;
    text-decoration: none;
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
  