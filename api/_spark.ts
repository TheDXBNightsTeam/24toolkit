import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Catch-all proxy for _spark endpoints
 * This handles all /_spark/* requests and routes them appropriately
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Spark-Initial');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract path from query parameter (Vercel rewrite) or URL
  let path = (req.query.path as string) || req.url || '';
  
  // If path is array, join it
  if (Array.isArray(path)) {
    path = '/' + path.join('/');
  }
  
  // Remove query string and normalize
  path = path.split('?')[0];
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  console.log(`[SPARK PROXY] ${req.method} ${path} (query: ${req.query.path}, url: ${req.url})`);

  // Route to appropriate handler
  if (path === '/llm' || path === '' && req.url?.includes('/llm')) {
    const llmHandler = await import('./_spark/llm');
    return llmHandler.default(req, res);
  }
  
  if (path === '/user' || path === '' && req.url?.includes('/user')) {
    const userHandler = await import('./_spark/user');
    return userHandler.default(req, res);
  }
  
  if (path === '/loaded' || path === '' && req.url?.includes('/loaded')) {
    const loadedHandler = await import('./_spark/loaded');
    return loadedHandler.default(req, res);
  }
  
  if (path === '/kv' || path === '' && req.url?.includes('/kv')) {
    const kvHandler = await import('./_spark/kv/index');
    return kvHandler.default(req, res);
  }
  
  if (path.startsWith('/kv/')) {
    const key = path.replace('/kv/', '').split('?')[0];
    // Inject key into query
    req.query = { ...req.query, key };
    const kvKeyHandler = await import('./_spark/kv/[key]');
    return kvKeyHandler.default(req, res);
  }

  return res.status(404).json({ error: 'Endpoint not found', path });
}
