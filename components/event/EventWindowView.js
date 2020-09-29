import {Event} from "./../../models/entities/Event.js";

export class EventWindowView{

    /**
     * 
     * @param {Event[]} events 
     */
    view(event){
        return webix.ui({
            data:event
        })
    }
}