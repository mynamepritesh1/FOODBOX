import { Customer } from "./customer";

export class Purchase{
    id : number;
    dob: Date;
    productname: string;
    quantity: number;
    totalcost: number;
    transactionid: string;
    customer: Customer

}