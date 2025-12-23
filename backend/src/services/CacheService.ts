import { Redis } from 'ioredis';

class CacheService {
  private client: Redis | null = null; // Can be null if Redis is off

  constructor() {
    const redisUrl = process.env.REDIS_URL;

    if (redisUrl) {
      this.client = new Redis(redisUrl);
      this.client.on('error', (err) => console.error('Redis Client Error', err));
      this.client.on('connect', () => console.log('✅ Redis connected successfully.'));
    } else {
      console.warn('⚠️ No REDIS_URL found. CacheService is running in "Pass-through" mode (No caching).');
    }
  }

  public async get(key: string): Promise<any | null> {
    if (!this.client) return null; // Skip if no Redis
    
    const data = await this.client.get(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  public async set(key: string, data: any, ttlSeconds: number = 3600): Promise<void> {
    if (!this.client) return; // Do nothing if no Redis
    await this.client.set(key, JSON.stringify(data), 'EX', ttlSeconds);
  }

  public async del(key: string): Promise<void> {
    if (!this.client) return; // Do nothing if no Redis
    await this.client.del(key);
  }
}

export const cacheService = new CacheService();