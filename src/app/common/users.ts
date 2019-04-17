export interface IUser {
    // Don't need ID like other interfaces, because the current user already has it
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone: string;
    userRoleId?: number;
    isTrainer?: boolean;
}

export enum UserRoles {
    Admin = 1,
    User = 2
}