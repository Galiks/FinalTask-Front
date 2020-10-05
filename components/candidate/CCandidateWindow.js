import { Candidate } from "../../models/entities/Candidate.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CANDIDATE_STATUS } from "./CCandidateTab.js";
import { CandidateWindowView } from "./CandidateWindowView.js";

export class CandidateWindowController{
    constructor(){
        this.candidateModel = new CandidateModel()
        this.candidateWindowView = new CandidateWindowView()
    }

    init(){
        
    }

    attachEventEventOnHideWindow(window){
        $$(window).attachEvent("onHide", ()=> {
            this.closeWindow(window)
        })
    }

     /**
     * Метод закрывает указанное окно и разблокирует главное окно
     * @param {string} window ID окна
     */
    closeWindow(window) {
        $$(window).close();
        $$("main").enable();
    }
    
    /**
     * Метод удаляет данные из таблицы "candidates" и заполняет её заново
     */
    refreshCandidateDatatable(){
        let candidates = this.candidateModel.getCandidates()
        $$("candidates").clearAll()
        $$("candidates").define("data", candidates)
        $$("candidates").refresh()
    }

    attachCandidateOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", () =>{
            this.closeWindow("createWindow");
        })

        this.attachEventEventOnHideWindow("createWindow")

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            let values = $$("createForm").getValues()
            let id = this.candidateModel.getLastID() + 1
            this.candidateModel.createCandidate(
                new Candidate(id, values.firstname, values.lastname, values.patronymic, 
                    values.email, values.phone, values.status))
    
            this.refreshCandidateDatatable()
            this.closeWindow("createWindow");
        })
    }

    attachCandidateOnUpdateWindow(employee){
        $$("updateWindowClose").attachEvent("onItemClick", () =>{
            this.closeWindow("updateWindow")
        });

        this.attachEventEventOnHideWindow("updateWindow")

        $$("updateForm").setValues({
            ID: employee.ID,
            firstname: employee.firstname,
            lastname: employee.lastname,
            patronymic: employee.patronymic,
            email: employee.email,
            phone: employee.phone,
            status: employee.status
        })

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            let values = $$("updateForm").getValues()
            this.candidateModel.updateCandidate(new Candidate(
                values.ID, values.firstname, values.lastname, values.patronymic, 
                values.email, values.phone, values.status))
            this.closeWindow("updateWindow")    
            this.refreshCandidateDatatable()
        })
          
    }

    attachCandidateOnDeleteWindow(employee){
        $$("deleteWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("deleteWindow")
        })

        this.attachEventEventOnHideWindow("deleteWindow")

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.candidateModel.deleteCandidate(employee.ID)
            this.refreshCandidateDatatable()
            this.closeWindow("deleteWindow")
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")
        })
    }

    attachCandidateOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("aboutWindow")     
        });

        this.attachEventEventOnHideWindow("aboutWindow")
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