import { Gender } from "./gender";
export interface Client{
    id?:number;
    lastName?:string;
    firstName?:string;
    gender?:Gender;
    birthDate?:string;
    birthplace?:string;
    jobTitle?:string;
    maritalStatus?:string;
    phoneNumber?:string;
    landLine?:string;
    email?:string;
    password?:string;
    // resident:string;
    nationality?:string;

}