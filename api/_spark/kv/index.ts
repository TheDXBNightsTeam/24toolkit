import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * KV Store endpoint - Root endpoint (returns all keys)
 * 
 * Note: This is a minimal in-memory implementation.
 * Data is not persisted across serverless function restarts.
 * 
 * For production persistence, consider:
 * - Vercel KV: https://vercel.com/docs/storage/vercel-kv
 * - Upstash Redis: https://upstash.com/
 */

// Initialize global KV store
if (!global.kvStore) {
  (global as any).kvStore = new Map<string, any>();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const kvStore = (global as any).kvStore as Map<string, any>;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return all keys
    const keys = Array.from(kvStore.keys());
    return res.status(200).json(keys);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
