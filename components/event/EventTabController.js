import { EventModel } from './../../models/EventModel.js'
import { EventWindowController } from "./EventWindowController.js";
import { EventTabView } from './EventTabView.js';
import { EmployeeModel } from "./../../models/EmployeeModel.js";
import { CandidateModel } from "./../../models/CandidateModel.js";

export class EventTabController{

    constructor(){  
        this.eventWindowController = new EventWindowController()
        this.eventTabView = new EventTabView()
        this.eventModel = new EventModel()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()
    }

    init(){
        this.eventWindowController.init()

        // let view = this.eventTabView.view(this.eventModule.getEvents())

        this.attachEvent()
        this.attachEventWindowHandler(this)
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
            }
            else if (this.getItem(id).value == "Подробнее"){
                let employeesIDs = controller.eventWindowController.getEmployeeIDByEventID(element.ID)
                let candidatesIDs = controller.eventWindowController.getCandidateIDByEventID(element.ID)

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
                let candidatesIDs = controller.eventWindowController.getCandidateIDByEventID(element.ID)

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

export const EVENT_STATUC = {
    planned: "Запланировано",
    inProgress: "В процессе",
    finished: "Закончено",
    archive: "Архив"
}