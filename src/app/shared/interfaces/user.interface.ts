import { IPreference } from './preference.interface';

export interface IUser{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    address:string,
    phone:string,
    preferences:IPreference,
    role?:string
}