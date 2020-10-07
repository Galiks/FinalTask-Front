import { Candidate } from "../../models/entities/Candidate.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CandidateWindowView } from "./CandidateWindowView.js";

export class CandidateWindowController{
    constructor(){
        this.candidateModel = new CandidateModel()
        this.candidateWindowView = new CandidateWindowView()
    }

    /**
     * Метод для инициализации переменных
     */
    init(){
        this.cmenu = $$("candidatecmenu")
        this.datatable = $$("candidates")
    }

    /**
     * Метод для проверки пустых строк
     * @returns true/false
     */
    isEmptyString(){
        for (let index = 0; index < arguments.length; index++) {
            const element = arguments[index];
            if (element.trim() == ''){
                return true
            }
        }
        return false
    }

    /**
     * Метод для привязки события на скрытие окна к окну кандидата
     * @param {string} window имя окна
     */
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
     * Метод показыает указанное окно и блокирует главное окно
     * @param {string} window имя окна
     */
    showWindow(window){
        $$(window).show();
        $$("main").disable();
    }
    
    /**
     * Метод обновляет данные в таблице candidates
     */
    refreshDatatable(){
        this.candidateModel.getCandidates().then((data)=>{
            if (data.length == 0) {
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить"])
                this.cmenu.refresh()
                let empty = [new Object]
                this.refreshDatatableData(empty)
            }else{
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить","Удалить", "Изменить", { $template:"Separator" },"Подробнее"])
                this.cmenu.refresh()
                this.refreshDatatableData(data);
            }
        })
    }

    /**
     * Метод для обновления данных в таблице candidates
     * @param {Array} data массив данных
     */
    refreshDatatableData(data) {
        this.datatable.clearAll();
        this.datatable.parse(data);
        this.datatable.refresh();
    }

    attachCandidateOnCreateWindow(){

        this.showWindow("createWindow")

        $$("createWindowClose").attachEvent("onItemClick", () =>{
            this.closeWindow("createWindow");
        })

        this.attachEventEventOnHideWindow("createWindow")

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            var form = $$("createForm");
            if (!form.validate()){
                webix.message("Email имеет неверный формат!")
                $$("createForm").clear()
                return
            }
            let values = this.fetch("createForm")
            if (this.isEmptyString(values.firstname, values.lastname, values.patronymic, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            let id = this.candidateModel.getLastID() + 1
            this.candidateModel.createCandidate(values).then((creatingCandidate)=>{
                this.refreshDatatable()
                this.closeWindow("createWindow");
            })
        })
    }

    attachCandidateOnUpdateWindow(employee){

        this.showWindow("updateWindow")

        $$("updateWindowClose").attachEvent("onItemClick", () =>{
            this.closeWindow("updateWindow")
        });

        this.attachEventEventOnHideWindow("updateWindow")

        this.parse("updateForm", employee)

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            var form = $$("updateForm");
            if (!form.validate()){
                webix.message("Email имеет неверный формат!")
                $$("updateForm").clear()
                return
            }
            let values = this.fetch("updateForm")
            if (this.isEmptyString(values.firstname, values.lastname, values.patronymic, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            this.candidateModel.updateCandidate(values).then((updatingCandidat)=>{
                this.closeWindow("updateWindow")    
                this.refreshDatatable()
            })
        })
          
    }

    attachCandidateOnDeleteWindow(employee){
        this.showWindow("deleteWindow")

        $$("deleteWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("deleteWindow")
        })

        this.attachEventEventOnHideWindow("deleteWindow")

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.candidateModel.deleteCandidate(employee.ID).then(()=>{
                this.closeWindow("deleteWindow")
                this.refreshDatatable()
            })
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")
        })
        
    }

    attachCandidateOnAboutWindow(){
        this.showWindow("aboutWindow")

        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("aboutWindow")     
        });

        this.attachEventEventOnHideWindow("aboutWindow")
    }

    createWindow(){
        webix.ui(this.candidateWindowView.viewCreateWindow())
        this.attachCandidateOnCreateWindow()
    }

    deleteWindow(candidate){
        webix.ui(this.candidateWindowView.viewDeleteWindow(candidate))
        this.attachCandidateOnDeleteWindow(candidate)
    }

    updateWindow(candidate){
        webix.ui(this.candidateWindowView.viewUpdateWindow(candidate))
        this.attachCandidateOnUpdateWindow(candidate)
    }

    aboutWindow(candidate){
        webix.ui(this.candidateWindowView.viewAboutWindow(candidate))
        this.attachCandidateOnAboutWindow()
    }

    /**
     * Метод возвращает данные с формы
     * @param {string} formName имя формы
     * @returns данные с формы
     */
    fetch(formName){
        return $$(formName).getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {string} formName имя формы
     * @param {*} values значения
     */
    parse(formName, values){
        $$(formName).setValues(values)
    }
}

export const CANDIDATE_STATUS = {
    empty: "",
    invite: "Приглашен",
    showUp: "Явился",
    dontShowUp: "Не явился",
    wait: "Ожидает результат",
    success: "Успешно",
    unsuccess: "Неуспешно"
}