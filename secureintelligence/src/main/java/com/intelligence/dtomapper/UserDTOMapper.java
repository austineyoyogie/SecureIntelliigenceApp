package com.intelligence.dtomapper;

import com.intelligence.dto.UserDTO;
import com.intelligence.entities.Role;
import com.intelligence.entities.User;
import org.springframework.beans.BeanUtils;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/21/23 - Tuesday
 */
public class UserDTOMapper {
    public static UserDTO fromUser(User user) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }

    public static UserDTO fromUser(User user, Role role) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        userDTO.setRoleName(role.getName());
        userDTO.setPermissions(role.getPermissions());
        return userDTO;
    }

    public static User toUser(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }
}
