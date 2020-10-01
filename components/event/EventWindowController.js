import { EventWindowView } from "./EventWindowView.js";
import { EventModel } from "./../../models/EventModel.js";
import { Event } from "./../../models/entities/Event.js";

export class EventWindowController{
    constructor(){
        this.eventModel = new EventModel()
        this.eventWindowView = new EventWindowView()
    }

    init(){

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

    attachEventOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("createWindow")
          })
    }

    attachEventOnUpdateWindow(event){
        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("updateWindow")     
          });

          $$("updateForm").setValues({
            theme: event.theme,
            beginning: event.beginning
        })
          
    }

    attachEventOnDeleteWindow(event){
        $$("deleteWindowClose").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")  
          })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.eventModel.deleteEvent(event.ID)
            this.closeWindow("deleteWindow")
            this.refreshEventsDatatable()
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")
        })
    }

    attachEventOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("aboutWindow")
          })
    }

    createEvent(){
        webix.ui(this.eventWindowView.viewCreateWindow())
        this.attachEventOnCreateWindow()
    }

    deleteEvent(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))
        this.attachEventOnDeleteWindow(event)
    }

    updateEvent(event){
        webix.ui(this.eventWindowView.viewUpdateWindow())
        this.attachEventOnUpdateWindow(event)
    }

    aboutEvent(event){
        webix.ui(this.eventWindowView.viewAboutWindow(event))
        //this.attachEventOnAboutWindow()
    }
}