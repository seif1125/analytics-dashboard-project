import { Redis } from 'ioredis';

class CacheService {
  private client: Redis;

  constructor() {
    // Reads configuration from .env: REDIS_HOST, REDIS_PORT
    this.client = new Redis({
      host: process.env.REDIS_HOST, 
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.client.on('connect', () => console.log('✅ Redis connected successfully.'));
  }

  /**
   * Gets data from cache and returns it as a parsed object.
   * @param key The cache key.
   */
  public async get(key: string): Promise<any | null> {
    const data = await this.client.get(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(`Failed to parse cached data for key: ${key}`);
        return null;
      }
    }
    return null;
  }

  /**
   * Sets data in the cache with an optional time-to-live (TTL).
   * @param key The cache key.
   * @param data The data to cache (will be stringified).
   * @param ttlSeconds Time to live in seconds (default: 1 hour).
   */
  public async set(key: string, data: any, ttlSeconds: number = 3600): Promise<void> {
    await this.client.set(key, JSON.stringify(data), 'EX', ttlSeconds);
  }

  public async del(key: string): Promise<void> {
      await this.client.del(key);
  }
}

// Export a singleton instance for global use
export const cacheService = new CacheService();