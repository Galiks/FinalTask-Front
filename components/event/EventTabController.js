import { EventModel } from './../../models/EventModel.js'
import { EventWindowController } from "./EventWindowController.js";
import { EventTabView } from './EventTabView.js';

export class EventTabController{

    constructor(){  
        this.eventWindowController = new EventWindowController()
        this.eventTabView = new EventTabView()
        this.eventModule = new EventModel()
    }

    init(){
        this.eventWindowController.init()
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
     * @param {number} id 
     */
    showEvents(){        
        return this.eventTabView.view(this.eventModule.getEvents())
    }
}