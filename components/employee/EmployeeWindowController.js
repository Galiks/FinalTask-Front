import { EmployeeModel } from 'models/EmployeeModel';
import { EmployeeWindowView } from './EmployeeWindowView'

export class EmployeeWindowController{
    constructor(){

    }

    static config(){
        return webix.ui({

        })
    }

    static attachEvents(){

    }

     /**
     * 
     * @param {string} window 
     */
    static switchWindows(window){
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

    show(){
        let employees = EmployeeModel.getEmployees()

        EmployeeWindowView.view(employees)
    }

    hide(){
        
    }
}