package vn.edu.iuh.fit.authservice.services;

public interface TokenRedisService {
    void setTokenToBlackList(String token, String username);

    boolean isInBlackList(String s);
}
