import { Redis } from 'ioredis';

class CacheService {
  private client: Redis | null = null;

  constructor() {
    const redisUrl = process.env.REDIS_URL;

    // Only attempt connection if URL is present and NOT a placeholder
    if (redisUrl && redisUrl !== 'undefined' && redisUrl.startsWith('redis')) {
      this.client = new Redis(redisUrl, {
        // Critical: Stop trying to connect if it fails
        maxRetriesPerRequest: 1, 
        connectTimeout: 5000,
        retryStrategy(times) {
          if (times > 2) return null; // Stop retrying after 2 attempts
          return Math.min(times * 50, 2000);
        },
      });

      this.client.on('error', (err) => {
        // Log the error but don't let it crash the process
        console.error('Redis Client Error:', err.message);
      });

      this.client.on('connect', () => console.log('✅ Redis connected successfully.'));
    } else {
      console.warn('⚠️ No REDIS_URL found. CacheService is running in "Pass-through" mode.');
    }
  }

  public async get(key: string): Promise<any | null> {
    try {
      if (!this.client || this.client.status !== 'ready') return null;
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  public async set(key: string, data: any, ttlSeconds: number = 3600): Promise<void> {
    try {
      if (!this.client || this.client.status !== 'ready') return;
      await this.client.set(key, JSON.stringify(data), 'EX', ttlSeconds);
    } catch (e) {
      console.error('Cache Set Error:', e);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      if (!this.client || this.client.status !== 'ready') return;
      await this.client.del(key);
    } catch (e) {
      console.error('Cache Del Error:', e);
    }
  }
}

export const cacheService = new CacheService();