import {Event} from "./../../models/entities/Event.js";

export class EventWindowView{

    constructor(){
        
    }

    viewCreateWindow(){
        let createWindow = {
            view:"window",
            height:250,
            width:300,
            head:"Окно содания",
            position:"center",
            body:{
              "autoheight": false,
              "view": "form",
              "rows": [
                { "view": "text", "label": "Тема", "name": "theme", "type":"text" },
                { "view": "text", "label": "Время проведения", "name": "beginning", "type":"datetime-local" },
                { "view": "button", "css": "webix_primary", "label": "Создать", "id":"createWindowButton" }
              ]
            },
            close: true,
            id: "createWindow"
          }
          return createWindow;
        }

        viewDeleteWindow(event){
          let deleteWindow = {
            view:"window",
            height: 250,
            width: 300,
            head:"Окно удаления",
            position:"center",
            body:{
              "rows": [
                {
                  "template": "Вы уверены, что хотите удалить мероприятие <<" + event.theme + ">>",
                  "view": "template"
                },
                {
                  "cols": [
                    { "label": "Да", "view": "button", id:"deleteWindowButtonYes" },
                    { "label": "Нет", "view": "button", id:"deleteWindowButtonNo" }
                  ]
                }
              ]
            },
            close: true,
            id: "deleteWindow"
          }
          return deleteWindow
        }

        viewUpdateWindow(event){
          let updateWindow = {
            view:"window",
            height:250,
            width:300,
            head:"Окно изменения",
            position:"center",
            body:{
              "autoheight": false,
              "view": "form",
              "id":"updateForm",
              "rows": [
                { "view": "text", "label": "Тема", "name": "theme", "type":"text" },
                { "view": "text", "label": "Время проведения", "name": "beginning", "type":"datetime-local" },
                { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton" }
              ]
            },
            close: true,
            id: "updateWindow"
          }

          return updateWindow
        }

        viewAboutWindow(event){
          let aboutWindow = {
            view:"window",
            height:250,
            width:300,
            head:"Окно информации",
            position:"center",
            body:{
              "elements": [
                { "label": "Информация", "type": "label" },
                { "label": "Тема", "type": "text", "id": "width", "value": event.theme },
                { "label": "Время начала", "type": "text", "id": "height", "value": event.beginning }
              ],
              "view": "property"
            },
            close: true,
            id: "aboutWindow"
          }

          return aboutWindow
        }
    }
