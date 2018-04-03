export interface User {
    fName?: String;
    lName?: String;
    name?: String;
    email?: String;
    password?: String;
}

export class UserObject implements User { }
