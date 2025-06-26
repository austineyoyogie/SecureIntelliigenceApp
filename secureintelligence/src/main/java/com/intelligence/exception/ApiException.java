package com.intelligence.exception;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/21/23 - Tuesday
 */
public class ApiException extends RuntimeException{
    public ApiException(String message) {
        super(message);
    }
}
