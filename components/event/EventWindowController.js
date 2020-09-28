import { EventWindowView } from "./EventWindowView";
import { EventModel } from "models\EventModel.js";
import { Event } from "models\entities\Event";

export class EventWindowController{
    constructor(){
        
    }

    /**
     * @returns Layout of Webix
     */
    static config(){
        return webix.ui({

        })
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

    show(){
        let events = EventModel.getEvents()

        EventWindowView.view()
    }

    hide(){
        
    }
}