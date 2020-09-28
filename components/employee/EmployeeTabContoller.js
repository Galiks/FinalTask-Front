import { Employee } from "models/entities/Employee";
import { EmployeeWindowController } from "components/employee/EmployeeWindowController";
import { EmployeeModel } from "models/EmployeeModel";
import { EventTabView } from "../event/EventTabView";

export class EmployeeTabController{
    /**
     * 
     * @param {Employee} employee 
     */
    constructor(employee){
        this.employee = employee
        this.employeeWindow = new EmployeeWindowController()
    }

    static config(){

    }

    static attachEvent(){

    }

    /**
     * 
     * @param {number} id 
     */
    static showEmployeeByID(id){
        let showEmployee = EmployeeModel.getEmployeeByID(id)
        
        EventTabView.view(showEmployee)
    }
}