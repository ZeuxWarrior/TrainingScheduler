import { IEvent } from "../events/events";
import { ISession } from "../sessions/sessions";

export interface ISchedule {
    userId: number;
    eventId: number;
    Events?: IEvent;
    Sessions?: ISession[];
}