import { EventWindowView } from "./EventWindowView.js";
import { EventModel } from "./../../models/EventModel.js";
import { Event } from "./../../models/entities/Event.js";

export class EventWindowController{
    constructor(){
        this.eventModel = new EventModel()
        this.eventWindowView = new EventWindowView()
    }

    init(){
        // webix.ui(this.createEvent())
        // webix.ui(this.deleteEvent())
        // webix.ui(this.updateEvent())
        // webix.ui(this.aboutEvent())

        // this.attachEventOnUpdateWindow()
        // this.attachEventOnWindow()
    }

    /**
     * @returns Layout of Webix
     */
    config(){
        return {
            
        }
    }

    attachEventOnUpdateWindow(event){
        $$("updateForm").setValues({
            theme: event.theme,
            beginning: event.beginning
        })
    }

    attachEventOnWindow(){
        $$("createWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
      
          $$("deleteWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
      
          $$("updateWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
      
          $$("aboutWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
    }

    createEvent(){
        webix.ui(this.eventWindowView.viewCreateWindow())
        $$("createWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
    }

    deleteEvent(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))
        $$("deleteWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
    }

    updateEvent(event){
        webix.ui(this.eventWindowView.viewUpdateWindow(event))
        $$("updateWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
    }

    aboutEvent(event){
        webix.ui(this.eventWindowView.viewAboutWindow(event))
        $$("aboutWindow").attachEvent("onHide", function(){
            $$("main").enable()
          })
    }
}