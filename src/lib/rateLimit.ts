const requestsMap = new Map<string, { count: number; time: number }>();

export function isRateLimited(userId: string) {
    const currentTime = Date.now();
    const windowTime = 60 * 1000; // 1 minute
    const maxRequests = 10;

    const userData = requestsMap.get(userId);

    if (!userData) {
        requestsMap.set(userId, { count: 1, time: currentTime });
        return false;
    }

    if (currentTime - userData.time > windowTime) {
        // reset window
        requestsMap.set(userId, { count: 1, time: currentTime });
        return false;
    }

    if (userData.count >= maxRequests) {
        return true;
    }

    userData.count += 1;
    return false;
}