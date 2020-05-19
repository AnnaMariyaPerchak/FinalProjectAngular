import { IPreference } from '../interfaces/preference.interface';

export class Preference implements IPreference{
    constructor(public id:string,
        // public userId:number,
        public optionMeat: boolean,
        public optionFish: boolean,
        public optionDairyProduct: boolean,
        public optionSugar: boolean,
        public optionGluten: boolean){}
}