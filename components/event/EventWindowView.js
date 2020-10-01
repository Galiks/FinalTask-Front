import {Event} from "./../../models/entities/Event.js";

export class EventWindowView{

    constructor(){

    }

    viewCreateWindow(){
        let createWindow = {
            view:"window",
            height:250,
            width:300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно создания" },
                    { view:"button", label: 'Close', id:"createWindowClose" , width: 100, align: 'right'}
                  ]
            },
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
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно удаления" },
                    { view:"button", label: 'Close', id:"deleteWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "rows": [
                {
                  "template": "Вы уверены, что хотите удалить мероприятие '" + event.theme + "'",
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

        /**
         * 
         * @returns 
         */
        viewUpdateWindow(){
          let updateWindow = {
            view:"window",
            height:250,
            width:300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно изменения" },
                    { view:"button", label: 'Close', id:"updateWindowClose" , width: 100, align: 'right'}
                  ]
            },
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

        viewAboutWindow(event, employees, candidates){
          // let aboutWindow = {
          //   view:"window",
          //   height:250,
          //   width:300,
          //   head:{
          //       view:"toolbar", cols:[
          //           { view:"label", label: "Окно информации" },
          //           { view:"button", label: 'Close', id:"aboutWindowClose" , width: 100, align: 'right'}
          //         ]
          //   },
          //   position:"center",
          //   body:{
          //     "elements": [
          //       { "label": "Информация", "type": "label" },
          //       { "label": "Тема", "type": "text", "value": event.theme },
          //       { "label": "Время начала", "type": "text", "value": event.beginning }
          //     ],
          //     "view": "property"
          //   },
          //   close: true,
          //   id: "aboutWindow"
          // }
          
          let aboutWindow = {
            view:"window",
            height:250,
            width:300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно информации" },
                    { view:"button", label: 'Close', id:"aboutWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "cols": [
                {
                  "rows": [
                    { "label": "Тема", "view": "label", "value": "Собрание" },
                    { "label": "Время", "view": "label", "value": "ваыаы" },
                    {
                      "cols": [
                        {
                          "options": [],
                          "label": "Values",
                          "value": "1,2",
                          "view": "multiselect",
                          "height": 0
                        },
                        {
                          "options": [],
                          "label": "Values",
                          "value": "1,2",
                          "view": "multiselect",
                          "height": 0
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            close: true,
            id: "aboutWindow"
          }
          return aboutWindow
        }
    }
