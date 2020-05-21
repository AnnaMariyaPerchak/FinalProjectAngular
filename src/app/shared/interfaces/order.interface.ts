import { IDish } from './dish.interface';
import { User } from '../modules/user.module';

export interface IOrder{
    id:string,
    user:User,
    // userFirstName:string,
    // userLastName:string,
    // userAddress:string,
    // userPhone:string,
    dishesForOrder:Array<IDish>,
    totalPayment:number,
    // userEmail:string
}
    // orderStatus: boolean;