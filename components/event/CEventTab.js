import { EventModel } from '../../models/EventModel.js'
import { EventWindowController } from "./CEventWindow.js";
import { EventTabView } from './EventTabView.js';
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CANDIDATE_STATUS } from '../candidate/CCandidateTab.js';

export class EventTabController{

    constructor(){  
        this.eventWindowController = new EventWindowController()
        this.eventTabView = new EventTabView()
        this.eventModel = new EventModel()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()
    }

    init(){
        this.eventWindowController.init(this.eventModel)
        this.attachEvent()
        this.attachEventWindowHandler(this)
    }

    getEmployeeIDByEventID(eventID){
        return this.eventModel.getEmployeeIDByEventID(eventID)
    }

    getCandidateIDByEventID(eventID){
        return this.eventModel.getCandidateIDByEventID(eventID)
    }

     /**
     * Метод закрывает указанное окно и разблокирует главное окно
     * @param {string} window ID окна
     */
    closeWindow(window) {
        $$(window).close();
        $$("main").enable();
    }

    refreshEventsDatatable(){
        let events = this.eventModel.getEvents()
        $$("events").clearAll()
        $$("events").define("data", events)
        $$("events").refresh()
    }

    refreshCandidatesDatatable(){
        let candidates = this.candidateModel.getCandidates()
        $$("candidates").clearAll()
        $$("candidates").define("data", candidates)
        $$("candidates").refresh()
    }

    /**
     * @returns Layout of Webix
     */
    config(){
        return this.eventTabView.view(this.eventModel.getEvents())
    }

    attachEvent(){
        $$("eventcmenu").attachTo($$("events"));
    }

    /**
     * Метод показывает указанное окно и блокирует главное окно
     * @param {string} window ID окна 
     */
    showWindow(window){
        $$(window).show()
        $$("main").disable()
    }

    /**
     * 
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        $$("eventcmenu").attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            let constructorName = element.constructor.name
            if (this.getItem(id).value == "Добавить"){   
                controller.eventWindowController.createEvent(controller.employeeModel.getEmployeesLikeIDValue(), controller.candidateModel.getCandidatesLikeIDValue())
                controller.showWindow("createWindow")
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.eventWindowController.deleteEvent(element)
                controller.showWindow("deleteWindow")
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.eventWindowController.updateEvent(element, 
                    controller.employeeModel.getEmployeesLikeIDValue(element.ID), 
                    controller.candidateModel.getCandidatesLikeIDValue(element.ID))
                
                controller.showWindow("updateWindow")

                $$("updateWindowButton").attachEvent("onItemClick", ()=>{
                    let values = $$("updateForm").getValues()
                    let eventID = values.ID
                    let event = controller.eventModel.getEventByID(eventID)
                    let eventStatus = event.status

                    if (eventStatus == EVENT_STATUS.planned) {
                        let candidateIDsEvent = controller.eventModel.getCandidateIDByEventID(element.ID)
                        candidateIDsEvent.forEach(candidateID => {
                            controller.candidateModel.updateCandidateStatus(candidateID, CANDIDATE_STATUS.invite)
                        })
                    }

                    else if (eventStatus == EVENT_STATUS.finished) {
                        let candidateIDsEvent = controller.eventModel.getCandidateIDByEventID(element.ID)
                        candidateIDsEvent.forEach(candidateID => {
                            controller.candidateModel.updateCandidateStatus(candidateID, CANDIDATE_STATUS.wait)
                        })
                    }

                    controller.closeWindow("updateWindow")    
                    controller.refreshEventsDatatable()
                    controller.refreshCandidatesDatatable()
                })
        

                
            }
            else if (this.getItem(id).value == "Подробнее"){
                let employeesIDs = controller.ggetEmployeeIDByEventID(element.ID)
                let candidatesIDs = controller.getCandidateIDByEventID(element.ID)

                let employees = []
                employeesIDs.forEach(id => {
                    employees.push(controller.employeeModel.getEmployeeByID(id))
                });

                let candidates = []
                candidatesIDs.forEach(id => {
                    candidates.push(controller.candidateModel.getCandidateByID(id))
                })

                controller.eventWindowController.aboutEvent(element, employees, candidates)

                controller.showWindow("aboutWindow")
            }
            else if (this.getItem(id).value == "Завершить"){
                let candidatesIDs = controller.getCandidateIDByEventID(element.ID)

                let candidates = []
                candidatesIDs.forEach(id => {
                    candidates.push(controller.candidateModel.getCandidateByID(id))
                })

                controller.eventWindowController.finishEvent(element, candidates);

                controller.showWindow("finishWindow")
            }  
          });
    }
}

export const EVENT_STATUS = {
    planned: "Запланировано",
    inProgress: "В процессе",
    finished: "Закончено",
    archive: "Архив"
}