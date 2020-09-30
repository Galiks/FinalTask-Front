import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateWindowView{
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
                { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text" },
                { "view": "text", "label": "Имя", "name": "firstname", "type":"text" },
                { "view": "text", "label": "Отчество", "name": "theme", "type":"text" },
                { "view": "text", "label": "Email", "name": "theme", "type":"text" },
                { "view": "text", "label": "Телефон", "name": "theme", "type":"text" },
                { "view": "button", "css": "webix_primary", "label": "Создать", "id":"createWindowButton" }
              ]
            },
            close: true,
            id: "createWindow"
          }

          return createWindow;
        }

        viewDeleteWindow(){
  
          let deleteWindow = {
            view:"window",
            height:250,
            width:300,
            head:"Окно удаления",
            position:"center",
            body:{
              "rows": [
                {
                  "template": "Вы уверены, что хотите удалить данных элемент?",
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

        viewUpdateWindow(){
          let updateWindow = {
            view:"window",
            height:250,
            width:300,
            head:"Окно изменения",
            position:"center",
            body:{
              "autoheight": false,
              "view": "form",
              "rows": [
                { "view": "text", "label": "User name", "name": "name" },
                { "view": "text", "label": "Email", "name": "email" },
                { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton" }
              ]
            },
            close: true,
            id: "updateWindow"
          }

          return updateWindow
        }

        viewAboutWindow(){
          let aboutWindow = {
            view:"window",
            height:250,
            width:300,
            head:"Окно информации",
            position:"center",
            body:{
              "elements": [
                { "label": "Информация", "type": "label" },
                { "label": "Width", "type": "text", "id": "width", "value": 250 },
                { "label": "Height", "type": "text", "id": "height", "value": 250 }
              ],
              "view": "property"
            },
            close: true,
            id: "aboutWindow"
          }

          return aboutWindow
        }
}