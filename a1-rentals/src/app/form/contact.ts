export class Contact {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public subject: string,
        public message: string,
        public phoneNumber: string
    ) { }

    toString() {
        var contactForm = "Form ID: " + this.id + "\n"; 
        contactForm = "First Name: " + this.firstName + "\n";
        contactForm = "Last Name: " + this.lastName + "\n";
        contactForm = "Email: " + this.email + "\n";
        contactForm = "Subject: " + this.subject + "\n";
        contactForm = "Message: " + this.message + "\n";
        if (this.phoneNumber != null) {
            contactForm = "Phone Number: " + this.phoneNumber + "\n";
        }
        return contactForm;
    }

}
