import { Employee } from "./../../models/entities/Employee.js";

export class EmployeeWindowView{
    constructor(){

    }

    /**
     * 
     * @param {Employee[]} employees 
     */
    view(employees){
        return webix.ui({
            data: employees
        })
    }
}