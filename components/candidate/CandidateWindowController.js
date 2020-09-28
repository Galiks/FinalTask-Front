import { CandidateModel } from "models\CandidateModel.js";
import { CandidateWindowView } from "./CandidateWindowView";

export class CandidateWindowController{
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
        let candidates = CandidateModel.getCandidates()

        CandidateWindowView.view(candidates)
    }

    hide(){
        
    }
}