import { EmployeeWindowController } from "./EmployeeWindowController.js";
import { EmployeeModel } from "./../../models/EmployeeModel.js";
import { EmployeeTabView } from "../employee/EmployeeTabView.js";

export class EmployeeTabController{

    constructor(){
        this.employeeWindowController = new EmployeeWindowController()
        this.employeeModel = new EmployeeModel()
        this.employeeTabView = new EmployeeTabView()
    }

    init(){
        this.employeeWindowController.init()
    }

    config(){
        return {

        }
    }

    attachEvent(){

    }

     showEmployees(){
        let employees = this.employeeModel.getEmloyees()
        return this.employeeTabView.view(employees)
    }
}