import { CandidateWindowController } from "./CandidateWindowController";
import { CandidateModel } from "models/CandidateModel";
import { CandidateTabView } from "./CandidateTabView";

export class CandidateTabController{
    constructor(){
        this.candidateWindow = new CandidateWindowController()
    }

    static config(){
        return webix.ui({

        })
    }

    static attachEvents(){

    }

    static showCandidateByID(id){
        let showCandidate = CandidateModel.getCndidateByID()

        CandidateTabView.view(showCandidate)
    }


}