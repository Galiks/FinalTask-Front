import { CandidateModel } from "./../../models/CandidateModel.js";
import { CandidateWindowView } from "./CandidateWindowView.js";

export class CandidateWindowController{
    constructor(){
        this.candidateModel = new CandidateModel()
        this.candidateWindowView = new CandidateWindowView()
    }

    init(){
        
    }

    static config(){
        return {

        }
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

    show(id){
        let candidate = this.candidateModel.getCandidateByID(id)

        this.candidateWindowView.view(candidate)
    }

    hide(){
        
    }
}