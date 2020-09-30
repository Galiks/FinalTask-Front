import { Event } from './../../models/entities/Event.js';

export class EventTabView{

    /**
     * 
     * @param {Event[]} events
     */
     view(events){
        return {
            "data": events,
            "columns": [
                { "id": "ID", "header": "Номер", "sort": "number" },
                { "id": "theme", "header": "Тема", "fillspace": true, "sort": "string" },
                { "id": "beginning", "header": "Начало", "fillspace":true, "sort": "Date" },
                { "id": "id_events_status", "header": "Статус", "sort": "number" }
            ],
            "view": "datatable",
            "height": 0,
            "id":"events"
        }
    }
}