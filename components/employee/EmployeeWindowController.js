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
            case "add":
                //redirect to EventWindowView
                break;
            case "delete":
                //redirect to EmployeeWindowView
                break;
            case "info":
                //redirect to CandidateWindowView
                break;
            case "edit":
                //redirect to CandidateWindowView
                break;
            default:
                //redirect to currentWindow
                break;
        }
    }

    #show(id){
        let employee = this.employeeModel.getEmployeeByID(id) 

        this.employeeWindowView.view(employee)
    }

    #hide(){
        
    }
}