import { EventModel } from "../../models/EventModel.js";
import { EventWindowController } from "./CEventWindow.js";
import { EventTabView } from "./EventTabView.js";
import { EmployeeModel } from "./../../models/EmployeeModel.js";
import { CandidateModel } from "./../../models/CandidateModel.js";

export class EventTabController{
    constructor(){
        this.eventTabView = new EventTabView()
        this.eventWindowController = new EventWindowController()
    }

    init(){
        this.eventWindowController.init()

        this.datatable = $$("events")
        this.cmenu = $$("eventcmenu")

        this.eventWindowController.refreshDatatable("events")

        this.attachEvent()
    }

    config(){
        return this.eventTabView.view()
    }

    attachEvent(){
        this.cmenu.attachTo(this.datatable);
        this.attachEventToContextMenu(this)
    }

    attachEventToContextMenu(controller){
        this.cmenu.attachEvent("onItemClick", function(id){
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let event = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){             
                controller.eventWindowController.createWindow()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.eventWindowController.deleteWindow(event)        
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.eventWindowController.updateWindow(event)
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.eventWindowController.aboutWindow(event)
            }
            else if (this.getItem(id).value == "Завершить"){
                controller.eventWindowController.finishWindow(event)
            }  
        })
    }
}

// import { EventModel } from '../../models/EventModel.js'
// import { EventWindowController } from "./CEventWindow.js";
// import { EventTabView } from './EventTabView.js';
// import { EmployeeModel } from "../../models/EmployeeModel.js";
// import { CandidateModel } from "../../models/CandidateModel.js";
// import { CANDIDATE_STATUS } from '../candidate/CCandidateTab.js';

// export class EventTabController{
//     constructor(){  
//         this.eventWindowController = new EventWindowController()
//         this.eventTabView = new EventTabView()
//         this.eventModel = new EventModel()
//         this.employeeModel = new EmployeeModel()
//         this.candidateModel = new CandidateModel()
//     }

//     /**
//      * Метод для инициализации переменных
//      */
//     init(){
//         this.eventWindowController.init(this.eventModel)

//         this.attachEvent()
//     }

//     /**
//      * Метод возвращает ID сотрудников определённого мероприятия в виде массива
//      * @param {number} eventID ID мероприятия 
//      * @returns ID сотрудников в виде массива
//      */
//     getEmployeeIDByEventID(eventID){
//         return this.eventModel.getEmployeeIDByEventID(eventID)
//     }

//     /**
//      * Метод возвращает ID кандидатов определённого мероприятия в виде массива
//      * @param {number} eventID ID мероприятия
//      * @returns ID кандидатов в виде массива
//      */
//     getCandidateIDByEventID(eventID){
//         return this.eventModel.getCandidateIDByEventID(eventID)
//     }

//      /**
//      * Метод закрывает указанное окно и разблокирует главное окно
//      * @param {string} window ID окна
//      */
//     closeWindow(window) {
//         $$(window).close();
//         $$("main").enable();
//     }

//     /**
//      * Метод обновляет таблицу "candidates"
//      */
//     refreshCandidatesDatatable(){
//         this.candidateModel.getCandidates((candidates) =>{
//             $$("candidates").clearAll()
//             $$("candidates").parse(candidates)
//             $$("candidates").refresh()
//         })
//     }

//     /**
//      * Метод возвращает конфигурацию WEBIX для таблицы
//      * @returns конфигурация WEBIX
//      */
//     config(){
//         return this.eventTabView.view()
//     }

//     /**
//      * Метод для привязыки событий
//      */
//     attachEvent(){
//         $$("eventcmenu").attachTo($$("events"));
//         this.attachEventWindowHandler(this)
//         this.refreshEventDatatable()
//     }

//     /**
//      * Метод показывает указанное окно и блокирует главное окно
//      * @param {string} window ID окна 
//      */
//     showWindow(window){
//         $$(window).show()
//         $$("main").disable()
//     }

//     /**
//      * Метод для привязывания событий к контексному меню
//      * @param {this} controller объект класса CEventTab
//      */
//     attachEventWindowHandler(controller){
//         $$("eventcmenu").attachEvent("onItemClick", function(id) {
            // let context = this.getContext();
            // let item = context.obj;
            // let itemID = context.id;
            // let element = item.getItem(itemID)
            // let constructorName = element.constructor.name
            // if (this.getItem(id).value == "Добавить"){   
            //     controller.attachEventCreateWindowHandler();
            // }
            // else if (this.getItem(id).value == "Удалить"){
            //     controller.attachEventDeleteWindowHandler(element);
            // }
            // else if (this.getItem(id).value == "Изменить"){
            //     controller.attachEventUpdateWindowHandler(element);      
            // }
            // else if (this.getItem(id).value == "Подробнее"){
            //     controller.attachEventAboutWindowHandler(element);
            // }
            // else if (this.getItem(id).value == "Завершить"){
            //     controller.attachEventFinishWindowHandler(element);
            // }  
//         });
//     }

//     /**
//      * Метод привязывает события к окну с завершением мероприятия
//      * @param {Event} element объект класса Event
//      */
//     attachEventFinishWindowHandler(element) {
//         let candidatesIDs = this.getCandidateIDByEventID(element.ID);

//         let candidates = [];
//         candidatesIDs.forEach(id => {
//             candidates.push(this.candidateModel.getCandidateByID(id));
//         });

//         this.eventWindowController.finishEvent(element, candidates);

//         this.showWindow("finishWindow");
//     }

//     /**
//      * Метод привязывает события к окну с информацией о мероприятии
//      * @param {Event} element объект класса Event
//      */
//     attachEventAboutWindowHandler(element) {
//         let employeesIDs = this.getEmployeeIDByEventID(element.ID);
//         let candidatesIDs = this.getCandidateIDByEventID(element.ID);

//         let employees = [];
//         employeesIDs.forEach(id => {
//             employees.push(this.employeeModel.getEmployeeByID(id));
//         });

//         let candidates = [];
//         candidatesIDs.forEach(id => {
//             candidates.push(this.candidateModel.getCandidateByID(id));
//         });

//         this.eventWindowController.aboutEvent(element, employees, candidates);

//         this.showWindow("aboutWindow");
//     }

//     /**
//      * Метод привязывает события к окну с изменением мероприятия
//      * @param {Event} element объект класса Event
//      */
//     attachEventUpdateWindowHandler(element) {
//         this.eventWindowController.updateEvent(element,
//             this.employeeModel.getEmployeesLikeIDValue(element.ID),
//             this.candidateModel.getCandidatesLikeIDValue(element.ID));

//             this.showWindow("updateWindow");

//         $$("updateWindowButton").attachEvent("onItemClick", () => {
//             let values = $$("updateForm").getValues();
//             let eventID = values.ID;
//             let event = this.eventModel.getEventByID(eventID);
//             let eventStatus = event.status;

            // if (eventStatus == EVENT_STATUS.planned) {
            //     let candidateIDsEvent = this.eventModel.getCandidateIDByEventID(element.ID);
            //     candidateIDsEvent.forEach(candidateID => {
            //         this.candidateModel.updateCandidateStatus(candidateID, CANDIDATE_STATUS.invite);
            //     });
            // }

            // else if (eventStatus == EVENT_STATUS.finished) {
            //     let candidateIDsEvent = this.eventModel.getCandidateIDByEventID(element.ID);
            //     candidateIDsEvent.forEach(candidateID => {
            //         this.candidateModel.updateCandidateStatus(candidateID, CANDIDATE_STATUS.wait);
            //     });
            // }

//             this.refreshCandidatesDatatable();
//         });
//     }

//     /**
//      * Метод привязывает события к окну с удалением мероприятия
//      * @param {Event} element объект класса Event
//      */
//     attachEventDeleteWindowHandler(element) {
//         this.eventWindowController.deleteEvent(element);
//         this.showWindow("deleteWindow");
//     }

//     /**
//      * Метод привязыывает события к окну с созданием мероприятия
//      */
//     attachEventCreateWindowHandler() {
//         let employees = this.employeeModel.getEmployeesLikeIDValue();
//         let candidates = this.candidateModel.getCandidatesLikeIDValue();
//         this.eventWindowController.createEvent(employees, candidates);
//         this.showWindow("createWindow");
//     }

//     refreshEventDatatable(events) {
//         if (events) {
//             $$("events").clearAll()
//             $$("events").parse(events)
//             return
//         } else {
//             this.eventModel.getEvents().then((events) => {
//                 $$("events").clearAll()
//                 $$("events").parse(events)
//             })
//         }
//     }
// }