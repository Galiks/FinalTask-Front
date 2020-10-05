import { EVENT_STATUS } from '../components/event/CEventTab.js';
import {Event} from './entities/Event.js';

export class EventModel{

    //key - id, value - event
    constructor(){
        this.events = new Map()
        // this.events.set(1, new Event(1, "StandUp", new Date(), EVENT_STATUS.planned))
        // this.events.set(2, new Event(2, "Собеседование", new Date(), EVENT_STATUS.planned))

        this.employeeEvent = [
            {   
                employeeID: 1,
                eventID: 1
            }
        ]

        this.candidateEvent = [
            {   
                candidateID: 1,
                eventID: 1
            }
        ]
    }

    setCandidateToEvent(candidateID, eventID){
        this.candidateEvent.push({candidateID:Number(candidateID), eventID: Number(eventID)})
    }

    getCandidateToEvent(){
        return this.candidateEvent;
    }

    setEmployeeToEvent(employeeID, eventID){
        this.employeeEvent.push({employeeID:Number(employeeID), eventID: Number(eventID)})
    }

    getEmployeeToEvent(){
        return this.employeeEvent;
    }

    getEmployeeIDByEventIDLikeString(eventID){
        return String(this.getEmployeeIDByEventID(eventID))
    }

    getCandidateIDByEventIDLikeString(eventID){
        return String(this.getCandidateIDByEventID(eventID))
    }

    getCandidateIDByEventID(eventID){
        let result = []
        let candidates = this.candidateEvent.filter(element => element.eventID == eventID)
        candidates.forEach(element =>{
            result.push(element.candidateID)
        })
        return result
    }

    getEmployeeIDByEventID(eventID){
        let result = []
        let employees = this.employeeEvent.filter(element => element.eventID == eventID)
        employees.forEach(element =>{
            result.push(element.employeeID)
        })
        return result
    }

    updateCandidateEvent(candidateIDs, eventID){
        this.candidateEvent = this.candidateEvent.filter(element => element.eventID != eventID)
        candidateIDs.split(',').forEach(element => {
            this.setCandidateToEvent(element, eventID)
        })
    }

    updateEmployeeEvent(employeeIDs, eventID){
        this.employeeEvent = this.employeeEvent.filter(element => element.eventID != eventID)
        employeeIDs.split(',').forEach(element => {
            this.setEmployeeToEvent(element, eventID)
        })
    }

    getLastID(){
        if (this.events.size == 0) {
            return 0
        }
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
        let newEvent = new Event(event.ID, event.theme, event.beginning, event.status)
        this.events.set(event.ID, newEvent)
        return newEvent
    }

    /**
     * 
     * @param {Event} event 
     */
     updateEvent(event) {
        let updatingEvent = this.getEventByID(event.ID)

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
        this.deleteCandidateEventByEventID(id)
        this.deleteEmployeeEventByEventID(id)
    }

    deleteCandidateEventByEventID(eventID){
        for (let index = 0; index < this.candidateEvent.length; index++) {
            const element = this.candidateEvent[index];
            if (element.eventID == eventID){
                this.candidateEvent.splice(index, 1)
            }
        }
        // this.candidateEvent.forEach((item, i) => {
        //     if (item.eventID == eventID){
        //         this.candidateEvent.slice(i, 1);
        //     }
        // })
    }

    deleteEmployeeEventByEventID(eventID){
        for (let index = 0; index < this.employeeEvent.length; index++) {
            const element = this.employeeEvent[index];
            if (element.eventID == eventID){
                this.employeeEvent.splice(index, 1)
            }
        }
        // this.employeeEvent.forEach( (item,i) =>{
        //     if(item.eventID == eventID){
        //         this.employeeEvent.slice(i, 1);
        //     }
        // })
    }
}