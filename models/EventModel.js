import { EVENT_STATUC } from '../components/event/EventTabController.js';
import {Event} from './entities/Event.js';

export class EventModel{

    //key - id, value - event
    constructor(){
        this.events = new Map()
        this.events.set(1, new Event(1, "StandUp", new Date(), EVENT_STATUC.planned))
        this.events.set(2, new Event(2, "Собеседование", new Date(), EVENT_STATUC.inProgress))
    }

    getLastID(){
        let keys = Array.from(this.events.keys());
        return Math.max.apply(null, keys)
    }

     getEvents() {
        return Array.from(this.events.values())
    }

    /**
     * 
     * @param {number} id 
     */
     getEventByID(id) {
        return this.events.get(Number(id))
    }

    /**
     * 
     * @param {{ID: number; theme: string; beginning: Date; id_events_status: number}} event 
     */
     createEvent(event) {
        let id = this.events.size + 1
        let newEvent = new Event(event.id, event.theme, event.beginning)
        this.events.set(id, newEvent)
        return newEvent
    }

    /**
     * 
     * @param {Event} event 
     */
     updateEvent(event) {
        let updatingEvent = getEventByID(event.ID)

        updatingEvent.ID = event.ID
        updatingEvent.theme = event.theme
        updatingEvent.beginning = event.beginning
        updatingEvent.status = event.status

        this.events.set(event.ID, updatingEvent)

        return updatingEvent
    }

    /**
     * 
     * @param {number} id 
     */
     deleteEvent(id) {
        this.events.delete(id)
    }
}