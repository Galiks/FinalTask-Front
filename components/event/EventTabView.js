import { Event } from './../../models/entities/Event.js';

export class EventTabView{
    constructor(){
        
    }
    /**
     * 
     * @param {Event[]} events
     */
     view(events){

        let datatable = {
            "data": events,
            "columns": [
                { "id": "ID", "header": "Номер", "sort": "number" },
                { "id": "theme", "header": "Тема", "fillspace": true, "sort": "string" },
                { "id": "beginning", "header": "Начало", "fillspace":true, "sort": "Date" },
                { "id": "id_events_status", "header": "Статус", "sort": "number" }
            ],
            "view": "datatable",
            "id":"events",
            "select":true,
        }

          

        return{ 
            rows: [
            datatable
        ]
    }
    }
}

// ready(){
//     webix.ui({
//         view:"contextmenu",
//         id:"cmenu",
//         data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"]
//     }).attachTo(this)
// }