#############################################
###                                      ####
### Author: Austine I Owoh               ####
### Version: 1.0                         ####
### License: CMS Q Platform LLC          ####
### Date: November 20th, 2023 Monday     ####
####                                     ####
#############################################

CREATE SCHEMA IF NOT EXISTS secureintelligence;

SET NAMES 'UTF8MB4';
SET TIME_ZONE = 'US/Pacific';
SET TIME ZONE = '-8:00';

USE secureintelligence;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name    VARCHAR(50) NOT NULL,
    last_name     VARCHAR(50) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    password      VARCHAR(255) DEFAULT NULL,
    area_code     VARCHAR(30) DEFAULT NULL,
    telephone     VARCHAR(30) DEFAULT NULL,
    qr_code_secret    VARCHAR(255) DEFAULT NULL,
    qr_code_image_uri TEXT DEFAULT NULL,
    image_url        VARCHAR(255) DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    login_attempts   INTEGER DEFAULT 0,
    is_using_mfa     BOOLEAN DEFAULT FALSE,
    is_enabled       BOOLEAN DEFAULT FALSE,
    is_not_locked    BOOLEAN DEFAULT TRUE,
    is_non_expired   BOOLEAN NOT NULL DEFAULT FALSE,
    is_expired       BOOLEAN NOT NULL DEFAULT FALSE,
    last_login       DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT UQ_Users_Email UNIQUE (email)
);

DROP TABLE IF EXISTS Roles;

CREATE TABLE Roles
(
    id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    permissions  VARCHAR(255) NOT NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT   UQ_Roles_Name UNIQUE (name)
);

DROP TABLE IF EXISTS UserRoles;

CREATE TABLE UserRoles
(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    role_id     BIGINT UNSIGNED NOT NULL,
    CONSTRAINT  UQ_UserRoles_User_Id UNIQUE (user_id),
    CONSTRAINT  FK_User_Roles_User_Id FOREIGN KEY (user_id) REFERENCES Users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT  FK_User_Roles_Role_Id FOREIGN KEY (role_id) REFERENCES Roles (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE RESTRICT
);

DROP TABLE IF EXISTS EmailVerifications;

CREATE TABLE EmailVerifications
(
    id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT UNSIGNED NOT NULL,
    url            VARCHAR(255) NOT NULL,
    expiration_at  DATETIME NOT NULL,
    CONSTRAINT UQ_EmailVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_EmailVerifications_Url UNIQUE (url),
    CONSTRAINT FK_Email_Verifications_User_Id FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS ResetPasswordVerifications;

CREATE TABLE ResetPasswordVerifications
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    url             VARCHAR(255) NOT NULL,
    expiration_at   DATETIME NOT NULL,
    CONSTRAINT UQ_ResetPasswordVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_ResetPasswordVerifications_Url UNIQUE (url),
    CONSTRAINT FK_ResetPasswordVerifications_User_Id FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS TwoFactorVerifications;

CREATE TABLE TwoFactorVerifications
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    code            VARCHAR(10) NOT NULL,
    expiration_at   DATETIME NOT NULL,
    CONSTRAINT UQ_TwoFactorVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_TwoFactorVerifications_Code UNIQUE (code),
    CONSTRAINT FK_TwoFactorVerifications_User_Id FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Events;

CREATE TABLE Events
(
    id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type         VARCHAR(50) NOT NULL CHECK(type IN ('LOGIN_ATTEMPT', 'LOGIN_ATTEMPT_FAILURE', 'LOGIN_ATTEMPT_SUCCESS', 'PROFILE_UPDATE', 'PROFILE_PICTURE_UPDATE', 'ROLE_UPDATE', 'ACCOUNT_SETTINGS_UPDATE', 'PASSWORD_UPDATE', 'MFA_UPDATE')),
    description  VARCHAR(255) NOT NULL,
    CONSTRAINT UQ_Events_Type UNIQUE (type)
);

DROP TABLE IF EXISTS UserEvents;

CREATE TABLE UserEvents
(
    id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT UNSIGNED NOT NULL,
    event_id     BIGINT UNSIGNED NOT NULL,
    device       VARCHAR(100) DEFAULT NULL,
    ip_address   VARCHAR(100) DEFAULT NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_UserEvents_User_Id FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_UserEvents_Event_Id FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE RESTRICT ON UPDATE CASCADE
);