package com.intelligence.dto;

import lombok.*;

import java.math.BigInteger;
import java.time.LocalDateTime;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/20/23 - Monday
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String areaCode;
    private String telephone;
    private String qrCodeSecret;
    private String qrCodeImageUri;
    private String imageUrl;
    private String roleName;
    private String permissions;
    private Integer loginAttempts;
    private boolean isUsingMfa;
    private boolean isEnabled;
    private boolean isNotLocked;
    private boolean isNonExpired;
    private boolean isExpired;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
