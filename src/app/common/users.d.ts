export interface IUser {
    // Don't need ID like other interfaces, because the current user already has it
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
}