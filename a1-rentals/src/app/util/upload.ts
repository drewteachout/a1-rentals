export class Upload {

    $key: string;
    file: File;
    name: string;
    url: Promise<any>;
    progress: number;
    createdAt: Date = new Date();
    constructor(file: File) {
        this.file = file;
    }
}
