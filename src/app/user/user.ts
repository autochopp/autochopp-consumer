export class User {

    public password_confirmation: string

    constructor(
        public email: string,
        public password: string,
    ) { }
}