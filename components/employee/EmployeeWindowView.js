import { Employee } from "models/entities/Employee";

export class EmployeeWindowView{
    constructor(){

    }

    /**
     * 
     * @param {Employee[]} employees 
     */
    static view(employees){
        return webix.ui({
            data: employees
        })
    }
}