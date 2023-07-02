import { Posts } from "./posts";
import { Tasks } from "./tasks";

export class Users {
    constructor(public _id? : string, 
        public id? : number,
        public name? : string, 
        public email? : string, 
        public street? : string, 
        public city? : string, 
        public zipCode? : number,
        public tasks? : Tasks[],
        public posts? : Posts[]){}

}
