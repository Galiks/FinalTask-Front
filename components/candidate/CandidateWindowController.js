import { CandidateModel } from "./../../models/CandidateModel.js";
import { CandidateWindowView } from "./CandidateWindowView.js";

export class CandidateWindowController{
    constructor(){
        this.candidateModel = new CandidateModel()
        this.candidateWindowView = new CandidateWindowView()
    }

    init(){
        
    }

    refreshCandidateDatatable(){
        let candidates = this.candidateModel.getCandidates()
        $$("candidates").clearAll()
        $$("candidates").define("data", candidates)
        $$("candidates").refresh()
    }

    attachCandidateOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", function(){
            $$("createWindow").close()
            $$("main").enable()
          })
    }

    attachCandidateOnUpdateWindow(employee){
        $$("updateWindowClose").attachEvent("onItemClick", function(){
            $$("updateWindow").close()
            $$("main").enable()      
          });

          $$("updateForm").setValues({
            firstname: employee.firstname,
            lastname: employee.lastname,
            patronymic: employee.patronymic,
            email: employee.email,
            phone: employee.phone
        })
          
    }

    attachCandidateOnDeleteWindow(employee){
        $$("deleteWindowClose").attachEvent("onItemClick", function(){
            $$("deleteWindow").close()
            $$("main").enable()      
          })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", (id) =>{
            this.candidateModel.deleteCandidate(employee.ID)
            $$("deleteWindow").close()
            $$("main").enable()

            this.refreshCandidateDatatable()

            // let columns = $$('events').get
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            $$("deleteWindow").close()
            $$("main").enable() 
        })
    }

    attachCandidateOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", function(){
            $$("aboutWindow").close()
            $$("main").enable()      
          })
    }

    createCandidate(){
        webix.ui(this.candidateWindowView.viewCreateWindow())
        this.attachCandidateOnCreateWindow()
    }

    deleteCandidate(candidate){
        webix.ui(this.candidateWindowView.viewDeleteWindow(candidate))
        this.attachCandidateOnDeleteWindow(candidate)
    }

    updateCandidate(candidate){
        webix.ui(this.candidateWindowView.viewUpdateWindow(candidate))
        this.attachCandidateOnUpdateWindow(candidate)
    }

    aboutCandidate(candidate){
        webix.ui(this.candidateWindowView.viewAboutWindow(candidate))
        this.attachCandidateOnAboutWindow()
    }
}