import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * KV Store endpoint - Key-specific operations
 * 
 * Handles GET, POST (set), and DELETE operations for individual keys.
 * Uses in-memory storage that doesn't persist across function restarts.
 */

// Initialize global KV store
if (!global.kvStore) {
  (global as any).kvStore = new Map<string, any>();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const kvStore = (global as any).kvStore as Map<string, any>();
  const { key } = req.query;

  if (!key || typeof key !== 'string') {
    return res.status(400).json({ error: 'Key parameter is required' });
  }

  const decodedKey = decodeURIComponent(key);

  switch (req.method) {
    case 'GET': {
      // Get specific key value
      const value = kvStore.get(decodedKey);
      if (value === undefined) {
        return res.status(404).send('');
      }
      return res.status(200).send(JSON.stringify(value));
    }

    case 'POST': {
      // Set key value
      try {
        let value;
        if (typeof req.body === 'string') {
          value = JSON.parse(req.body);
        } else {
          value = req.body;
        }
        kvStore.set(decodedKey, value);
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error setting KV value:', error);
        return res.status(500).json({ error: 'Failed to set value' });
      }
    }

    case 'DELETE': {
      // Delete key
      kvStore.delete(decodedKey);
      return res.status(200).json({ success: true });
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
