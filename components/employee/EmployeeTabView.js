import { Employee } from "models/entities/Employee";

export class EmployeeTabView{


    /**
     * 
     * @param {Employee} employee 
     */
    static view(employee){
        return webix.ui({
            data:employee
        })
    }
}