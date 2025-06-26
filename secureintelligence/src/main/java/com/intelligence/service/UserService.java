package com.intelligence.service;

import com.intelligence.dto.UserDTO;
import com.intelligence.entities.User;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : CSM Q Platform LLC
 * @since : 11/20/23 - Monday
 */
public interface UserService {
    UserDTO createUser(User user);
    UserDTO getUserByEmail(String email);
    void sendVerificationCode(UserDTO user);
    UserDTO verifyCode(String email, String code);
    UserDTO getUserById(Long userId);
}
