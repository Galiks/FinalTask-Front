import {Event} from "/models/entities/Event";

export class EventWindowView{

    /**
     * 
     * @param {Event[]} events 
     */
    static view(events){
        return webix.ui({
            data:events
        })
    }
}