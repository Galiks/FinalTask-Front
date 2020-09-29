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
     * @returns Layout of Webix
     */
    static config(){
        return {
            
        }
    }

    static attachEvent(){

    }

    /**
     * 
     * @param {string} window 
     */
    static switchWindows(window){
        switch (window) {
            case "event":
                //redirect to EventWindowView
                break;
            case "employee":
                //redirect to EmployeeWindowView
                break;
            case "candidate":
                //redirect to CandidateWindowView
                break;
            default:
                //redirect to currentWindow
                break;
        }
    }

    show(id){
        let event = this.eventModel.getEventByID(id)

        this.eventWindowView.view(event)
    }

    hide(){
        
    }
}