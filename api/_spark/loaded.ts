import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // This is a stub endpoint for the Spark runtime's analytics/telemetry
  // In a real GitHub Spark deployment, this would log runtime load events
  // For this standalone deployment, we just acknowledge the request
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Silently acknowledge the load event
  return res.status(200).json({ success: true });
}
