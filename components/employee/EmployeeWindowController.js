import { EmployeeModel } from './../../models/EmployeeModel.js';
import { EmployeeWindowView } from './EmployeeWindowView.js'

export class EmployeeWindowController{
    constructor(){
        this.employeeWindowView = new EmployeeWindowView()
        this.employeeModel = new EmployeeModel()
    }

    init(){

    }

     config(){
        return {

        }
    }

    attachEvents(){

    }

     /**
     * 
     * @param {string} window 
     */
     switchWindows(window){
        switch (window) {
            case "event":
                //redirect to EventWindowView
                break;
            case "employee":
                //redirect to EmployeeWindowView
                break;
            case "candidate":
                //redirect to CandidateWindowView
                break;
            default:
                //redirect to currentWindow
                break;
        }
    }

    show(id){
        let employee = this.employeeModel.getEmployeeByID(id) 

        this.employeeWindowView.view(employee)
    }

    hide(){
        
    }
}