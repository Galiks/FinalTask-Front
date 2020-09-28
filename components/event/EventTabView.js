import { Event } from 'models/entities/Event.js';

export class EventTabView{

    /**
     * 
     * @param {Event} event 
     */
    static view(event){
        return webix.ui({
            data: event
        })
    }
}