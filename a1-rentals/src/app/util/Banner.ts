import { firestore } from 'firebase/app';

export class Banner {
    title = '';
    message = '';
    color = '';
    start_date: firestore.Timestamp;
    end_date: firestore.Timestamp;
    constructor(title: string, message: string, color: string, start_date: Date, end_date: Date) {
        this.title = title;
        this.message = message;
        this.color = color;

        this.start_date = firestore.Timestamp.fromDate(start_date);
        this.end_date = firestore.Timestamp.fromDate(start_date);
    }
}
