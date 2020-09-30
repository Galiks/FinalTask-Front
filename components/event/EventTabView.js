import { Event } from './../../models/entities/Event.js';

export class EventTabView{

    /**
     * 
     * @param {Event[]} events
     */
     view(events){

        var contextmenu = {
            view:"contextmenu",
            id:"cmenu",
            data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"],
            on:{
              onItemClick:function(id){
                let context = this.getContext();
                let item = context.obj;
                let itemID = context.id;
                let element = item.getItem(itemID)
                let constructorName = element.constructor.name
                if (constructorName == "Employee"){
                  
                }
                else if (constructorName == "Candidate"){
                  console.log(element.firstname + " - CANDIDATE")
                }
                else if (constructorName == "Event"){
                  
                }
                else {
                  console.log(typeof element)
                }
                console.log(this.getItem(id).value)             
              }
            }
          }  

        let datatable = {
            "data": events,
            "columns": [
                { "id": "ID", "header": "Номер", "sort": "number" },
                { "id": "theme", "header": "Тема", "fillspace": true, "sort": "string" },
                { "id": "beginning", "header": "Начало", "fillspace":true, "sort": "Date" },
                { "id": "id_events_status", "header": "Статус", "sort": "number" }
            ],
            "view": "datatable",
            "height": 0,
            "id":"events",
            "select":true,
            "onContext":{}
        }

        return datatable
    }
}