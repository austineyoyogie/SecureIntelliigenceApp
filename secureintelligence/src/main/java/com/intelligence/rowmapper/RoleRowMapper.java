package com.intelligence.rowmapper;

import com.intelligence.entities.Role;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/21/23 - Tuesday
 */
public class RoleRowMapper implements RowMapper<Role>  {


    @Override
    public Role mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        return Role.builder()
            .id(resultSet.getLong("id"))
            .name(resultSet.getString("name"))
            .permissions(resultSet.getString("permissions"))
            .build();
    }
}
