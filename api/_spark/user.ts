import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // This is a stub endpoint for the Spark runtime's user endpoint
  // In a real GitHub Spark deployment, this would return user information
  // For this standalone deployment, we return null (anonymous user)
  
  return res.status(200).json(null);
}
