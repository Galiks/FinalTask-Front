import {Event} from './entities/Event.js';

export class EventModel{

    //key - id, value - event
    constructor(){
        this.events = new Map()
        this.events.set(1, new Event(1, "StandUp", new Date(), 1))
        this.events.set(2, new Event(2, "Собеседование", new Date(), 2))
    }


     getEvents() {
        return Array.from(this.events.values())
    }

    /**
     * 
     * @param {number} id 
     */
     getEventByID(id) {
        return events.get(id)
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
        let updatingEvent = getEventByID(event.id)

        updatingEvent.ID = event.id
        updatingEvent.theme = event.theme
        updatingEvent.beginning = event.beginning
        updatingEvent.id_events_status = event.id_events_status

        return updatingEvent
    }

    /**
     * 
     * @param {number} id 
     */
     deleteEvent(id) {
        events.delete(id)
    }
}