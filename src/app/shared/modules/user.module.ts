import { IUser } from '../interfaces/user.interface';
import { IPreference } from '../interfaces/preference.interface';

export class User implements IUser{
    constructor(public id:string,
        public firstName:string,
        public lastName:string,
        public email:string,
        public password:string,
        public address:string,
        public phone:string,
        public preferences:IPreference,
        public role){}
}