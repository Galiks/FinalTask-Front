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

    /**
     * Метод устанавливает связь между кандидатом и мероприятием
     * @param {number} candidateID ID кандидата
     * @param {number} eventID ID мероприятия
     */
    setCandidateToEvent(candidateID, eventID){
        return new Promise((resolve, reject)=>{
            this.candidateEvent.push({candidateID:Number(candidateID), eventID: Number(eventID)})
            resolve()
        })
    }

    /**
     * Метод возвращает список кандидатов и мероприятий в виде массива
     * @returns список кандидатов и мероприятий в виде массива
     */
    getCandidatesToEvents(){
        return new Promise((resolve, reject)=>{
            resolve(this.candidateEvent)
        })
    }

    /**
     * Метод устанавливает связь между сотрудником и мероприятием
     * @param {number} employeeID ID сотрудника
     * @param {number} eventID ID мероприятия
     */
    setEmployeeToEvent(employeeID, eventID){
        return new Promise((resolve, reject)=>{
            this.employeeEvent.push({employeeID:Number(employeeID), eventID: Number(eventID)})
            resolve()
        })
    }

    /**
     * Метод возвращает список сотрудников и мероприятий в виде массива
     * @returns список сотрудников и мероприятий в виде массива
     */
    getEmployeesToEvents(){
        return new Promise((resolve, reject)=>{
            resolve(this.employeeEvent)
        })
    }

    /**
     * Метод возвращает ID сотрудников определённого мероприятия в виде строки
     * @param {number} eventID ID мероприятия
     * @returns список ID сотрудников в виде строки
     */
    getEmployeeIDByEventIDLikeString(eventID){
        return new Promise((resolve, reject)=>{
            resolve(String(this.getEmployeeIDByEventID(eventID)))
        })
    }

    /**
     * Метод возвращает ID кандидатов определённого мероприятия в виде строки
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде строки
     */
    getCandidateIDByEventIDLikeString(eventID){
        return new Promise((resolve, reject)=>{
            resolve(String(this.getCandidateIDByEventID(eventID)))
        })
    }

    /**
     * Метод возвращает ID кандидатов определённого мероприятия в виде массива
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде массива
     */
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

    /**
     * 
     * Метод возвращает ID кандидатов определённого мероприятия в виде массива
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде массива 
     */
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

    /**
     * Метод обновляет связь между кандидатом и мероприятием
     * @param {number} candidateIDs ID кандидата
     * @param {number} eventID ID мероприятия
     */
    updateCandidateEvent(candidateIDs, eventID){
        return new Promise((resolve, reject)=>{
            this.candidateEvent = this.candidateEvent.filter(element => element.eventID != eventID)
            candidateIDs.split(',').forEach(element => {
                this.setCandidateToEvent(element, eventID)
            })
            resolve()
        })
    }

    /**
     * Метод обновляет связь между сотрудников и мероприятием
     * @param {number} employeeIDs ID сотрудника
     * @param {number} eventID ID мероприятия 
     */
    updateEmployeeEvent(employeeIDs, eventID){
        return new Promise((resolve, reject)=>{
            this.employeeEvent = this.employeeEvent.filter(element => element.eventID != eventID)
            employeeIDs.split(',').forEach(element => {
                this.setEmployeeToEvent(element, eventID)
            })
            resolve()
        })
    }

    /**
     Метод возвращает последний номер коллекции
     * @returns последний номер коллекции
     */
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

    /**
     * Метод возвращает список мероприятий в виде массива
     * @returns список мероприятий в виде массива
     */
    getEvents() {
        return new Promise((resolve, reject)=>{
            resolve(Array.from(this.events.values()))
        })
    }

    /**
     * Метод возвращает мероприятие по его ID
     * @param {number} id ID мероприятия
     * @returns мероприятие
     */
     getEventByID(id) {
        return new Promise((resolve, reject)=>{
            resolve(this.events.get(Number(id)))
        })
    }

    /**
     * Метод создаёт мероприятие по заданным параметрам
     * @param {{ID: number; theme: string; beginning: Date; id_events_status: number}} event объект класса Event
     * @returns мероприятие
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
     * Метод обновляет мероприятие по заданным параметрам
     * @param {Event} event объект класса Event
     * @returns мероприятие
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
     * Метод удаляет мероприятие по ID
     * @param {number} id ID мероприятия
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

    /**
     * Метод удаляет связи между кандидатами и мероприятием
     * @param {number} eventID ID мероприятия 
     */
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

    /**
     * Метод удаляет связи между сотрудником и мероприятием
     * @param {number} eventID ID мероприятия 
     */
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