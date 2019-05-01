import { User } from './user';

export class AuthState {
    constructor(
        public user: User = new User(),
        public loggedIn: boolean = false,
        public message: string = "",
    ) { }
}
