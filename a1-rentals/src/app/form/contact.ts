export class Contact {

    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public email: string,
        public subject: string,
        public message: string,
        public phoneNumber?: string
    ) { }
}
