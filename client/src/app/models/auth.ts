import { User } from './user';

export class Auth {
    constructor(
        public user: User = new User(),
        public loggedIn: boolean = false,
        public message: string = "",
    ) { }
}
