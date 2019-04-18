import { IEvent } from "../events/events";
import { IVenue } from "./info/venues";
import { IUser } from "../common/users";

export interface ISession {
    id: number;
    eventId: number;
    venueId: number;
    roomNum: string;
    startTime: Date;
    endTime: Date;
    topicName: string;
    Events?: IEvent;
    Venues?: IVenue;
    Users?: IUser;
}