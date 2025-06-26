package com.intelligence.constant;

/**
 * @author : Austine I Owoh
 * @version : 1.0
 * @license : GC SP LLC
 * @since : 11/21/23 - Tuesday
 */

public class Constants {
    // Security Config
    public static final String[] PUBLIC_URLS = { "/auth/login/**", "/auth/register/**", "/auth/verify/password/**",
            "/auth/profile/**", "/auth/update/**", "/auth/verify/code/**", "/auth/resetpassword/**", "/auth/verify/account/**",
            "/auth/refresh/token/**", "/auth/image/**", "/auth/new/password/**"  };

    // User Repository Impl
    public static final String DATE_FORMAT = "yyyy-MM-dd hh:mm:ss";

    // SMS Utils - Twilio
    public static final String FROM_NUMBER = "+1916XXXXXXX";
    public static final String SID_KEY = "<Your own key>";
    public static final String TOKEN_KEY = "<Your own key>";

    // Token Provider
    public static final String AUTHORITIES = "authorities";
    public static final String GC_SP_LLC = "GC_SP_LLC";
    public static final String CONSUMER_SERVICE_PROVIDER = "CONSUMER_SERVICE_PROVIDER";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = 1_800_000; //432_000_000;  // 30_000; 30 seconds // 1_800_000; // 30 minutes
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = 430_000_000;  // 5 days
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";

    // Custom Authorization Filter || User Resource || WhiteList URL
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String[] PUBLIC_ROUTES = { "/auth/login", "/auth/register", "/auth/verify/code", "/auth/refresh/token", "/auth/new/password", "/auth/image" };
    public static final String HTTP_OPTIONS_METHOD = "OPTIONS";

}
