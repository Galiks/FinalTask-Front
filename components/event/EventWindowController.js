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

    refreshEventsDatatable(){
        let events = this.eventModel.getEvents()
        $$("events").clearAll()
        $$("events").define("data", events)
        $$("events").refresh()
    }

    attachEventOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", function(){
            $$("createWindow").close()
            $$("main").enable()
          })
    }

    attachEventOnUpdateWindow(event){
        $$("updateWindowClose").attachEvent("onItemClick", function(){
            $$("updateWindow").close()
            $$("main").enable()      
          });

          $$("updateForm").setValues({
            theme: event.theme,
            beginning: event.beginning
        })
          
    }

    attachEventOnDeleteWindow(event){
        $$("deleteWindowClose").attachEvent("onItemClick", function(){
            $$("deleteWindow").close()
            $$("main").enable()      
          })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", (id) =>{
            this.eventModel.deleteEvent(event.ID)
            $$("deleteWindow").close()
            $$("main").enable()

            this.refreshEventsDatatable()

            // let columns = $$('events').get
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            $$("deleteWindow").close()
            $$("main").enable() 
        })
    }

    attachEventOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", function(){
            $$("aboutWindow").close()
            $$("main").enable()      
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
        this.attachEventOnAboutWindow()
    }
}