import { firestore } from 'firebase/app';

export class Banner {
    title = '';
    message = '';
    color = '';
    db_name = '';
    start_date: Date;
    end_date: Date;
    constructor(title: string, message: string, color: string, start_date: Date, end_date: Date, db_name: string) {
        this.title = title;
        this.message = message;
        this.color = color;
        this.db_name = db_name;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    startDateToTimestamp(): firestore.Timestamp {
        return firestore.Timestamp.fromDate(this.start_date);
    }

    endDateToTimestamp(): firestore.Timestamp {
        return firestore.Timestamp.fromDate(this.end_date);
    }
}
