export interface IUser {
    id?: number;
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