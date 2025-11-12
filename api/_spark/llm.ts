import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get GitHub token from environment
  const githubToken = process.env.GITHUB_TOKEN;
  
  if (!githubToken) {
    console.error('GITHUB_TOKEN environment variable is not set');
    return res.status(500).json({ 
      error: 'Server configuration error: GITHUB_TOKEN not configured' 
    });
  }

  try {
    // Forward the request to GitHub Models API
    const response = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub Models API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `GitHub Models API error: ${response.statusText}`,
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error calling GitHub Models API:', error);
    return res.status(500).json({ 
      error: 'Failed to process AI request',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
