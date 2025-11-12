import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

  // Log request for debugging
  console.log('[LLM] Request body:', JSON.stringify(req.body).substring(0, 200));

  try {
    // Try GitHub Models API endpoint (without /inference)
    const apiUrl = 'https://models.github.ai/chat/completions';
    
    console.log('[LLM] Calling:', apiUrl);
    
    // Forward the request to GitHub Models API
    const response = await fetch(apiUrl, {
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
      
      // Return user-friendly error
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: `🔧 AI Service Configuration Needed\n\nThe GitHub Models API returned an error. This usually means:\n\n1. **GitHub Models needs to be enabled** for your account\n   - Visit: https://github.com/marketplace/models\n   - Request access to GitHub Models\n\n2. **Token needs proper scopes**\n   - Your token may need additional permissions\n   - Regenerate with "Models" scope if available\n\n3. **Alternative**: You can use OpenAI API instead\n   - Add OPENAI_API_KEY to environment variables\n\nError details: ${response.statusText}`
          },
          finish_reason: 'stop',
          index: 0
        }]
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
