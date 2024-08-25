// api/submit-survey.js
import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const surveyResponses = req.body;

    try {
      // Initialize Redis client using Upstash Redis URL
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      });

      // Store survey response in Redis
      const responseId = `survey:${Date.now()}`;
      await redis.set(responseId, JSON.stringify(surveyResponses));

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
