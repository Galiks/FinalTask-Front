import { EventWindowView } from "./EventWindowView.js";
import { Event } from "./../../models/entities/Event.js";
import { EventModel } from "../../models/EventModel.js";
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CANDIDATE_STATUS } from "../candidate/CCandidateWindow.js";
import { CCreateEventWindow } from "./WindowControllers/CCreateEventWindow.js";
import { CAboutEventWindow } from "./WindowControllers/CAboutEventWindow.js";
import { CUpdateEventWindow } from "./WindowControllers/CUpdateEventWindow.js";
import { CDeleteEventWindow } from "./WindowControllers/CDeleteEventWindow.js";
import { CFinishEventWindow } from "./WindowControllers/CFinishEventWindow.js";

export class CEventWindow{
    constructor(){
        
    }

    /**
     * Метод для инициализации
     * @param {EventModel} eventModel объект класса EventModel
     */
    init(eventModel, refreshTable){

        this.refreshDatatable = refreshTable
        this.eventModel = eventModel

        this.eventWindowView = new EventWindowView()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()

        this.createWindowController = new CCreateEventWindow();

        this.updateWindowController = new CUpdateEventWindow()
        this.deleteWindowController = new CDeleteEventWindow()
        this.aboutWindowController = new CAboutEventWindow();
        this.finishWindowController = new CFinishEventWindow();

        //this.createWindowController.refreshDatatable = (datatableName) =>{ this.refreshDatatable(datatableName)}

        // this.updateWindowController.updateCandidateStatus = (eventID, status) => {this.updateCandidateStatus(eventID, status)}
        // this.updateWindowController.refreshDatatable = (datatableName) => {this.refreshDatatable(datatableName)}

        // this.deleteWindowController.refreshDatatable = (datatableName) => {this.refreshDatatable(datatableName)}

        // this.finishWindowController.refreshDatatable = (datatableName) => {this.refreshDatatable(datatableName)}
        // this.finishWindowController.updateCandidateStatus = (eventID, status) => {this.updateCandidateStatus(eventID, status)}

        this.cmenu = $$("eventcmenu")
    }

    /**
     * Метод устанавливает значения для свойства options
     */
    setMultiselectOptions() {
        this.employeeModel.getEmployeesLikeIDValue().then((result) => {
            $$("employeesMultiselect").define("options", result);
            $$("employeesMultiselect").refresh();
        });
        this.candidateModel.getCandidatesLikeIDValue().then((result) => {
            $$("candidatesMultiselect").define("options", result);
            $$("candidatesMultiselect").refresh();
        });
    }

    /**
     * Метод устанавливает значения для свойства value
     * @param {number} eventID номер мероприятия
     */
    setMultiselectValue(eventID) {
        let employeesMultiselectValue = this.eventModel.getEmployeeIDByEventIDLikeString(eventID);
        employeesMultiselectValue.then((value) => {
            $$("employeesMultiselect").setValue(value);
        });
        let candidatesMultiselectValue = this.eventModel.getCandidateIDByEventIDLikeString(eventID);
        candidatesMultiselectValue.then((value) => {
            $$("candidatesMultiselect").setValue(value);
        });
    }

    /**
     * Метод вызывает окно для создания мероприятия
     */
    createWindow(){
        webix.ui(this.eventWindowView.viewCreateWindow())     
        this.createWindowController.init(this.eventModel, (datatableName) => {
            this.refreshDatatable(datatableName)
        })
        this.createWindowController.attachEventOnCreateWindow()
        this.setMultiselectOptions();   
    }
    
    /**
     * Метод вызывает окно для обновления данных мероприятия
     * @param {Event} event объект класса Event
     */
    updateWindow(event){
        webix.ui(this.eventWindowView.viewUpdateWindow(event))
        this.updateWindowController.init(this.eventModel, (eventID, status)=>{
            this.updateCandidateStatus(eventID, status)
        })
        this.updateWindowController.attachEventOnUpdateWindow(event)
        this.setMultiselectValue(event.ID);
        this.setMultiselectOptions()
    }

    /**
     * Метод вызывает окно для удаления мероприятия
     * @param {Event} event объект класса Event
     */
    deleteWindow(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))

        this.deleteWindowController.init(this.eventModel, (datatableName) => {
            this.refreshDatatable(datatableName)
        })
        this.deleteWindowController.attachEventOnDeleteWindow(event)
    }

    /**
     * Метод вызывает окно с информацией о мероприятии
     * @param {Event} event объект класса Event
     */
    aboutWindow(event){
        let { employees, candidates } = this.aboutWindowController.getEmployeesAndCandidatesByEvent(event);
    
        webix.ui(this.eventWindowView.viewAboutWindow(event, employees, candidates))

        this.aboutWindowController.attachEventOnAboutWindow()
    }

    /**
     * Метод вызывает окно для завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {number[]} candidates массив из ID кандидатов 
     */
    finishWindow(event){
        let candidates = [];
        Promise.all([
            this.eventModel.getCandidateIDByEventID(event.ID).then((IDs) => {
                IDs.forEach((id) => {
                    this.candidateModel.getCandidateByID(id).then((candidate) => {
                        candidates.push(candidate);
                    });
                });
            })
        ]).then(() => {
            webix.ui(this.eventWindowView.viewFinishWindow(event, candidates))

            this.finishWindowController.init(this.eventModel, this.candidateModel, (datatableName)=>{this.refreshDatatable(datatableName)}, (eventID, status)=>{this.updateCandidateStatus(eventID, status)})

            this.finishWindowController.attachEventOnFinishWindow(event, candidates)
        });
    }

    /**
     * Метод обновляет статус кандидата
     * @param {CANDIDATE_STATUS} status статус кандидата
     */
    updateCandidateStatus(eventID, status) {
        let candidateIDsEvent = this.eventModel.getCandidateIDByEventID(eventID);
        candidateIDsEvent.then((IDs) => {
            IDs.forEach(candidateID => {
                this.candidateModel.updateCandidateStatus(candidateID, status).then(() => {
                    this.refreshDatatable("candidates")
                });
            });
        });
    }
}

/**
 * Константа для хранения состояний мероприятия
 */
export const EVENT_STATUS = {
    planned: "Запланировано",
    inProgress: "В процессе",
    finished: "Закончено",
    archive: "Архив"
}