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
    config(){
        return {
            
        }
    }

    attachEvent(){

    }

    /**
     * 
     * @param {string} window 
     * @param {number} event
     */
    switchWindows(window, id){
        switch (window) {
            case "Добавить":
                //redirect to EventWindowView
                break;
            case "Удалить":
                //redirect to EmployeeWindowView
                break;
            case "Изменить":
                //redirect to CandidateWindowView
                break;
            case "Подробнее":
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