import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/do';
import { IUser, UserRoles } from '../users';

export interface ILoginResponse {
    success: boolean;
    token?: string;
    user?: IUser;
}

@Injectable()
export class AuthService {

    token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    constructor(
        private http: HttpClient,
    ) { }

    isAuthenticated(): boolean {
        return this.token ? true : false;
    }

    isAdmin(): boolean {
        return this.user && this.user.getValue().userRoleId === UserRoles.Admin ? true : false;
    }

    login(email: string, password: string): Observable<ILoginResponse> {
        const data = {
            email: email,
            password: password,
        };
        return this.http.post<ILoginResponse>('http://localhost:3000/login', data)
            .do((response) => {
                this.token.next(response && response.success && response.token || null);
                this.user.next(response && response.success && response.user || null);
            });
    }

    logout(): void {
        this.token.next(null);
    }

    signup(firstName: string, lastName: string, email: string, password: string, phone: string): Observable<any> {
        let data = {
            first: firstName,
            last: lastName,
            email: email,
            password: password,
            phone: phone,
            userRoleId: 2
        };
        return this.http.post<any>('http://localhost:3000/users', data);
    }

    update(userForm: IUser): Observable<any> {
        let data = {
            first: userForm.firstName,
            last: userForm.lastName,
            email: userForm.email,
            password: userForm.password,
            phone: userForm.phone
        };
        return this.http.put<any>('http://localhost:3000/users', data);
    }
}
