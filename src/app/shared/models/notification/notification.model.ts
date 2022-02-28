import { NotificationType } from "./notification-type.model";


export interface Notification {

    id: number;
    type: NotificationType;
    message: string;

}