import { EventWindowView } from "./EventWindowView.js";
import { EventModel } from "./../../models/EventModel.js";
import { Event } from "./../../models/entities/Event.js";
import { EVENT_STATUC } from "./EventTabController.js";
import { CANDIDATE_STATUS } from "../candidate/CandidateTabController.js";

export class EventWindowController{
    constructor(){
        this.eventModel = new EventModel()
        this.eventWindowView = new EventWindowView()
    }

    init(){

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
    attachEventToCloseWindow(window) {
        $$(window).close();
        $$("main").enable();
    }

    refreshEventsDatatable(){
        let events = this.eventModel.getEvents()
        $$("events").clearAll()
        $$("events").define("data", events)
        $$("events").refresh()
    }

    attachEventEventOnHideWindow(window){
        $$(window).attachEvent("onHide", ()=> {
            this.attachEventToCloseWindow(window)
        })
    }

    attachEventOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.attachEventToCloseWindow("createWindow")
        })

        this.attachEventEventOnHideWindow("createWindow")

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            let values = $$("createForm").getValues()
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            let id = this.eventModel.getLastID() + 1
            let newEvent = this.eventModel.createEvent(
                new Event(id, values.theme, values.beginning, values.status));

            employees.split(',').forEach(element => {
                this.eventModel.setEmployeeToEvent(element, id)
            });

            candidates.split(',').forEach(element=>{
                this.eventModel.setCandidateToEvent(element, id)
            });
            
            this.refreshEventsDatatable()
            this.attachEventToCloseWindow("createWindow");
        })
    }

    attachEventOnUpdateWindow(event){
        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.attachEventToCloseWindow("updateWindow")     
          });

        this.attachEventEventOnHideWindow("updateWindow")

        $$("updateForm").setValues({
            theme: event.theme,
            beginning: event.beginning,
            status: event.status
        })

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            let values = $$("updateForm").getValues()
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            this.eventModel.updateEvent(new Event(event.ID, values.theme, values.beginning, values.status))

            this.eventModel.updateCandidateEvent(candidates, event.ID)
            this.eventModel.updateEmployeeEvent(employees, event.ID)

            this.attachEventToCloseWindow("updateWindow")    
            this.refreshEventsDatatable()
        })

    }

    attachEventOnDeleteWindow(event){
        $$("deleteWindowClose").attachEvent("onItemClick", () =>{
            this.attachEventToCloseWindow("deleteWindow")  
          })

        this.attachEventEventOnHideWindow("deleteWindow")

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.eventModel.deleteEvent(event.ID)

            this.attachEventToCloseWindow("deleteWindow")
            this.refreshEventsDatatable()
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.attachEventToCloseWindow("deleteWindow")
        })
    }

    attachEventOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.attachEventToCloseWindow("aboutWindow")
        });

        this.attachEventEventOnHideWindow("aboutWindow")
    }

    attachEventOnFinishWindow(event, candidates){
        $$("finishWindowClose").attachEvent("onItemClick", ()=>{
            this.attachEventToCloseWindow("finishWindow")
        });

        $$("finishWindowButton").attachEvent("onItemClick", ()=>{

            if ($$("finishWindowButton").isEnabled()) {
                if(event.status == EVENT_STATUC.finished){
                    candidates.every(element => {
                    if(element.status != CANDIDATE_STATUS.wait || element.status != CANDIDATE_STATUS.dontShowUp){
                        $$("finishWindowButton").disable()
                        return false;
                    }
                });
                    //Если кандидат не "явился", то "не успешно"

                    this.eventModel.updateEvent(new Event(event.ID, event.theme, event.beginning, EVENT_STATUC.archive))

                    this.refreshEventsDatatable()
                }
                else{
                    $$("finishWindowButton").disable()
                }
            }
            else{
                $$("finishhint").start()
            }
        })
        this.attachEventEventOnHideWindow("finishWindow")

    }

    createEvent(employees, candidates){
        webix.ui(this.eventWindowView.viewCreateWindow(employees, candidates))
        this.attachEventOnCreateWindow()
    }

    deleteEvent(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))
        this.attachEventOnDeleteWindow(event)
    }

    updateEvent(event, employees, candidates){
        let employeesMultiselectValue = this.eventModel.getEmployeeIDByEventIDLikeString(event.ID)
        let candidatesMultiselectValue = this.eventModel.getCandidateIDByEventIDLikeString(event.ID)
        webix.ui(this.eventWindowView.viewUpdateWindow(employees, candidates, employeesMultiselectValue, candidatesMultiselectValue))
        this.attachEventOnUpdateWindow(event)
    }

    aboutEvent(event, employees, candidates){
        webix.ui(this.eventWindowView.viewAboutWindow(event, employees, candidates))
        this.attachEventOnAboutWindow()
    }

    finishEvent(event, candidates){
        webix.ui(this.eventWindowView.viewFinishWindow(event, candidates))
        this.attachEventOnFinishWindow(event, candidates)
    }
}