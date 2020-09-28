import { EventModule } from 'models\EventModel.js'
import { EventWindowController } from "./EventWindowController";
import { Event } from "models/entities/Event";
import { EventTabView } from './EventTabView';

export class EventTabController{

    /**
     * 
     * @param {Event} event 
     */
    constructor(event){
        this.event = event
        this.eventWindow = new EventWindowController()
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
     * @param {number} id 
     */
    static showEventByID(id){
        let showEvent = EventModule.getEventByID(id)
        
        EventTabView.view(showEvent)
    }
}