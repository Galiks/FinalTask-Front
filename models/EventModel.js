import { EVENT_STATUS } from '../components/event/CEventTab.js';
import {Event} from './entities/Event.js';

export class EventModel{

    //key - id, value - event
    constructor(){
        this.events = new Map()
        // this.events.set(1, new Event(1, "StandUp", new Date(), EVENT_STATUS.planned))
        // this.events.set(2, new Event(2, "Собеседование", new Date(), EVENT_STATUS.planned))

        this.candidateEvent = []
        this.employeeEvent = []
        // this.employeeEvent = [
        //     {   
        //         employeeID: 0,
        //         eventID: 0
        //     }
        // ]

        // this.candidateEvent = [
        //     {   
        //         candidateID: 0,
        //         eventID: 0
        //     }
        // ]
    }

    setCandidateToEvent(candidateID, eventID){
        return new Promise((resolve, reject)=>{
            this.candidateEvent.push({candidateID:Number(candidateID), eventID: Number(eventID)})
            resolve()
        })
    }

    getCandidatesToEvents(){
        return new Promise((resolve, reject)=>{
            resolve(this.candidateEvent)
        })
    }

    setEmployeeToEvent(employeeID, eventID){
        return new Promise((resolve, reject)=>{
            this.employeeEvent.push({employeeID:Number(employeeID), eventID: Number(eventID)})
            resolve()
        })
    }

    getEmployeesToEvents(){
        return new Promise((resolve, reject)=>{
            resolve(this.employeeEvent)
        })
    }

    getEmployeeIDByEventIDLikeString(eventID){
        return new Promise((resolve, reject)=>{
            resolve(String(this.getEmployeeIDByEventID(eventID)))
        })
    }

    getCandidateIDByEventIDLikeString(eventID){
        return new Promise((resolve, reject)=>{
            resolve(String(this.getCandidateIDByEventID(eventID)))
        })
    }

    getCandidateIDByEventID(eventID){
        return new Promise((resolve, reject)=>{
            let result = []
            let candidates = this.candidateEvent.filter(element => element.eventID == eventID)
            candidates.forEach(element =>{
                result.push(element.candidateID)
            })
            resolve(result)
        })
    }

    getEmployeeIDByEventID(eventID){
        return new Promise((resolve, reject)=>{
            let result = []
            let employees = this.employeeEvent.filter(element => element.eventID == eventID)
            employees.forEach(element =>{
                result.push(element.employeeID)
            })
            resolve(result)
        })
    }

    updateCandidateEvent(candidateIDs, eventID){
        return new Promise((resolve, reject)=>{
            this.candidateEvent = this.candidateEvent.filter(element => element.eventID != eventID)
            candidateIDs.split(',').forEach(element => {
                this.setCandidateToEvent(element, eventID)
            })
            resolve()
        })
    }

    updateEmployeeEvent(employeeIDs, eventID){
        return new Promise((resolve, reject)=>{
            this.employeeEvent = this.employeeEvent.filter(element => element.eventID != eventID)
            employeeIDs.split(',').forEach(element => {
                this.setEmployeeToEvent(element, eventID)
            })
            resolve()
        })
    }

    getLastID(){
        return new Promise((resolve, reject)=>{
            if (this.events.size == 0) {
                resolve(0)
            }
            else{
                let keys = Array.from(this.events.keys());
                resolve(Math.max.apply(null, keys))
            }
        })
        
    }

    getEvents() {
        return new Promise((resolve, reject)=>{
            resolve(Array.from(this.events.values()))
        })
    }

    /**
     * 
     * @param {number} id 
     */
     getEventByID(id) {
        return new Promise((resolve, reject)=>{
            resolve(this.events.get(Number(id)))
        })
    }

    /**
     * 
     * @param {{ID: number; theme: string; beginning: Date; id_events_status: number}} event 
     */
     createEvent(event) {
        return new Promise((resolve, reject)=>{
            let creatingEvent = this.getEventByID(event.ID)
            if (creatingEvent == null) {
                let newEvent = new Event(event.ID, event.theme, event.beginning, event.status)
                this.events.set(event.ID, newEvent)
                resolve(newEvent)   
            } else {
                reject(null)
            }
        })
    }

    /**
     * 
     * @param {Event} event 
     */
     updateEvent(event) {
        return new Promise((resolve, reject)=>{
            let updatingEvent = this.getEventByID(event.ID)
            if (updatingEvent != null) {
                this.events.set(event.ID, updatingEvent)
                resolve(updatingEvent)
            } else {
                reject(null)
            }
        })
    }

    /**
     * 
     * @param {number} id 
     */
    deleteEvent(id) {
        return new Promise((resolve, reject)=>{
            let deletingEvent = this.getEventByID(id)
            if (deletingEvent != null) {
                this.events.delete(id)
                this.deleteCandidateEventByEventID(id)
                this.deleteEmployeeEventByEventID(id)
                resolve()   
            } else {
                reject()
            }
        })
    }

    deleteCandidateEventByEventID(eventID){
        return new Promise((resolve, reject)=>{
            for (let index = 0; index < this.candidateEvent.length; index++) {
                const element = this.candidateEvent[index];
                if (element.eventID == eventID){
                    this.candidateEvent.splice(index, 1)
                }
            }
            resolve()
        })
    }

    deleteEmployeeEventByEventID(eventID){
        return new Promise((resolve, reject)=>{
            for (let index = 0; index < this.employeeEvent.length; index++) {
                const element = this.employeeEvent[index];
                if (element.eventID == eventID){
                    this.employeeEvent.splice(index, 1)
                }
            }
            resolve()
        })
    }
}