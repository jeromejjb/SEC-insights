// api/submit-survey.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const surveyResponses = req.body;

    try {
      // Store survey response in Vercel KV with a unique key
      await kv.set(`survey:${Date.now()}`, surveyResponses);

      // Respond with a success message
      res.status(200).json({ message: 'Survey data saved successfully!' });
    } catch (error) {
      console.error('Error saving survey data:', error);
      res.status(500).json({ message: 'Failed to save survey data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
