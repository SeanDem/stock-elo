import { Redis } from '@upstash/redis';
import { UPSTASH_API_KEY, UPSTASH_API_URL } from '$lib/env/upstash';

const redis = new Redis({
	url: UPSTASH_API_URL,
	token: UPSTASH_API_KEY
});

export default redis;
