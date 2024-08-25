// api/submit-survey.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Save survey data here
      const surveyResponses = req.body;
  
      // Example: Save to an array (this will reset on each deployment)
      let responses = [];
      responses.push(surveyResponses);
  
      // Respond with a success message
      res.status(200).json({ message: 'Survey data saved successfully!' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  