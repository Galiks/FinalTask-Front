import { CandidateWindowController } from "./CandidateWindowController.js";
import { CandidateModel } from "./../../models/CandidateModel.js";
import { CandidateTabView } from "./CandidateTabView.js";

export class CandidateTabController{
    constructor(){
        this.candidateWindow = new CandidateWindowController()
        this.candidateModel = new CandidateModel()
        this.candidateTabView = new CandidateTabView()
    }

    init(){
        this.candidateWindow.init()
    }

     config(){
        return {
            
        }
    }

    attachEvents(){

    }

    showCandidates(){
        let candidates = this.candidateModel.getCandidates()
        return this.candidateTabView.view(candidates)
    }


}