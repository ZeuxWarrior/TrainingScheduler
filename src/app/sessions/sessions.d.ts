import { IVenue } from "./info/venues";

export interface ISession {
    id: number;
    eventId: number;
    venueId: number;
    roomNum: string;
    startTime: Date;
    endTime: Date;
    topicName: string;
    Venues?: IVenue;
}