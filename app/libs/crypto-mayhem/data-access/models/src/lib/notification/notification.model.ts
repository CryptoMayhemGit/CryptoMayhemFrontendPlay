export interface Notification {
    id: number;
    type: NotificationType;
    message: string;
}

export enum NotificationType {
    Info = 'Info',
    Success = 'Success',
    Warning = 'Warning',
    Error = 'Error',
    Process = 'Process'
}
