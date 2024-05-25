package vn.edu.iuh.fit.authservice.services.impl;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.authservice.services.TokenRedisService;

import java.util.concurrent.TimeUnit;

@Service
public class TokenRedisServiceImpl implements TokenRedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    public TokenRedisServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setTokenToBlackList(String token, String username) {
        redisTemplate.opsForValue().set(token, username, 10, TimeUnit.MINUTES);
    }

    @Override
    public boolean isInBlackList(String s) {
        return redisTemplate.hasKey(s);
    }
}
