package com.intelligence.utils;

import com.intelligence.dto.UserDTO;
import com.intelligence.entities.UserPrincipal;
import org.springframework.security.core.Authentication;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : S AI B M
 * @since : 10/25/24 - Friday
 */
public class UserUtils {
    public static UserDTO getAuthenticatedUser(Authentication authentication) {
        return ((UserDTO) authentication.getPrincipal());
    }

    public static UserDTO getLoggedInUser(Authentication authentication) {
        return ((UserPrincipal) authentication.getPrincipal()).getUser();
    }
}
