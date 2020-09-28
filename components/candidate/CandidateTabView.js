export class CandidateTabView{
    constructor(){

    }

    static view(candidate){
        return webix.ui({
            data: candidate
        })
    }
}