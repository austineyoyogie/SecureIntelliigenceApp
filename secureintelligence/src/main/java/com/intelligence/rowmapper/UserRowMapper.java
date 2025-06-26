package com.intelligence.rowmapper;

import com.intelligence.entities.User;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/21/23 - Tuesday
 */
public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        return User.builder()
            .id(resultSet.getLong("id"))
            .firstName(resultSet.getString("first_name"))
            .lastName(resultSet.getString("last_name"))
            .email(resultSet.getString("email"))
            .telephone(resultSet.getString("telephone"))
            .password(resultSet.getString("password"))
            .areaCode(resultSet.getString("area_code"))
            .qrCodeSecret(resultSet.getString("qr_code_secret"))
            .qrCodeImageUri(resultSet.getString("qr_code_image_uri"))
            .imageUrl(resultSet.getString("image_url"))
            .loginAttempts(resultSet.getInt("login_attempts"))
            .isUsingMfa(resultSet.getBoolean("is_using_mfa"))
            .isEnabled(resultSet.getBoolean("is_enabled"))
            .isNotLocked(resultSet.getBoolean("is_not_locked"))
            .isNonExpired(resultSet.getBoolean("is_non_expired"))
            .isExpired(resultSet.getBoolean("is_expired"))
            .lastLogin(resultSet.getTimestamp("last_login").toLocalDateTime())
            .createdAt(resultSet.getTimestamp("created_at").toLocalDateTime())
            .updatedAt(resultSet.getTimestamp("updated_at").toLocalDateTime())
            .build();
    }
}
