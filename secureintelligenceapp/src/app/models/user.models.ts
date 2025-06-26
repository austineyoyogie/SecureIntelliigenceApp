export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  areaCode?: string;
  telephone?: string;
  qrCodeSecret: string;
  qrCodeImageUri?: string;
  imageUrl?: string;
  loginAttempts: number;
  usingMfa: boolean;
  isEnabled: boolean;
  isNotLocked: boolean;
  isNonExpired: boolean;
  isExpired: string;
  roleName: string;
  permissions: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
