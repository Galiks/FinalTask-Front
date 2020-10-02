import { Event } from './../../models/entities/Event.js';

export class EventTabView{
    constructor(){
        
    }
    /**
     * 
     * @param {Event[]} events
     */
     view(events){

        let contextmenu = {
            view:"contextmenu",
            id:"eventcmenu",
            data:["Добавить","Удалить", "Изменить", "Завершить",{ $template:"Separator" },"Подробнее"]
        }

        webix.ui(contextmenu)   

        return {
            "data": events,
            "header":{
                "label":"HEADER"
            },
            "columns": [
                { "id": "ID", "header": "Номер", "sort": "number" },
                { "id": "theme", "header": "Тема", "fillspace": true, "sort": "string" },
                { "id": "beginning", "header": "Начало", "fillspace":true, "sort": "Date" },
                { "id": "status", "header": ["Статус", {content:"selectFilter"}], "sort": "number" }
            ],
            "view": "datatable",
            "id":"events",
            "select":true,
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