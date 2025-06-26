package com.intelligence.service;

import com.intelligence.entities.Role;

import java.util.Collection;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/21/23 - Tuesday
 */
public interface RoleService {
    Role getRoleByUserId(Long id);
    Collection<Role> getRoles();
    //Role getRoleByUserId(Long id);
    //Collection<Role> getRoles();
}
