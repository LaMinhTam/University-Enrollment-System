package vn.edu.iuh.fit.authservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.authservice.models.Token;

public interface TokenRepository extends JpaRepository<Token, String> {

}
