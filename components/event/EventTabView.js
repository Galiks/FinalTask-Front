import { Event } from './../../models/entities/Event.js';

export class EventTabView{
    constructor(){
        
    }
    /**
     * 
     * @param {Event[]} events
     */
     view(events){

        let data
        if(events.length == 0){
            events.push(new Event())
            data = ["Добавить"]
        }else{
            data = ["Добавить","Удалить", "Изменить", "Завершить",{ $template:"Separator" },"Подробнее"]
        }

        let contextmenu = {
            view:"contextmenu",
            id:"eventcmenu",
            data:data
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
                { "id": "status", "header": ["Статус", {content:"selectFilter"}], "fillspace":true, "sort": "number" }
            ],
            "view": "datatable",
            "id":"events",
            "select":true,
        }
    }
}