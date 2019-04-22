import { IEvent } from "../events/events";

export interface ISchedule {
    userId: number;
    eventId: number;
    Events?: IEvent;
}