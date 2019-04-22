import { ISession } from "../sessions/sessions";

export interface IEvent {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    price: number;
    attendanceLimit: number;
    Sessions?: ISession[];
}