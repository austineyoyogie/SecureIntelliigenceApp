package com.intelligence.repository;

import com.intelligence.dto.UserDTO;
import com.intelligence.entities.User;
import java.util.Collection;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/20/23 - Monday
 */
public interface UserRepository<T extends User> {
    /* Basic CRUD Operations */
    T create(T data);
    Collection<T> list(int page, int pageSize);
    T get(Long id);
    T update(T data);
    Boolean delete(Long id);
    /* More Complex Operations */
    User getUserByEmail(String email);
    void sendVerificationCode(UserDTO user);
    T verifyCode(String email, String code);
}
