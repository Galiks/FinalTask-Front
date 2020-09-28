export class Event{
    /**
     * 
     * @param {number} id 
     * @param {string} theme 
     * @param {Date} beginning 
     * @param {number} id_events_status 
     */
    constructor(id, theme, beginning, id_events_status){
        this.ID = id
        this.theme = theme
        this.beginning = beginning
        this.id_events_status = id_events_status
    }
}