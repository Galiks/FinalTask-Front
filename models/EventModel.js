import {Event} from './entities/Event';

export class EventModel{

    //key - id, value - event
    constructor(){
        this.events = new Map()
    }


    static getEvents() {
        return this.events
    }

    static getEventByID(id) {
        return events.get(id)
    }

    static createEvent(event) {
        let id = this.events.size + 1
        let newEvent = new Event(event.id, event.theme, event.beginning)
        this.events.set(id, newEvent)
        return newEvent
    }

    static updateEvent(event) {
        let updatingEvent = getEventByID(event.id)

        updatingEvent.ID = event.id
        updatingEvent.theme = event.theme
        updatingEvent.beginning = event.beginning
        updatingEvent.id_events_status = event.id_events_status

        return updatingEvent
    }

    static deleteEvent(id) {
        events.delete(id)
    }
}