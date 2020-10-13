import { EVENT_STATUS } from "./CEventWindow.js";

export class EventWindowView{

    constructor(){

    }

    viewCreateWindow(){

      let employeesView = {
        "options": [],
        "label": "Сотрудники",
        labelWidth: 90,
        "id":"employeesMultiselect",
        "view": "multiselect",
        "height": 40
      }

      let candidatesView = {
        "options": [],
        "label": "Кандидаты",
        labelWidth: 90,
        "id":"candidatesMultiselect",
        "view": "multiselect",
        "height": 40
      }

      let createBody = {
        "cols": [
          {
            "autoheight": false,
            "view": "form",
            id:"createForm",
            "rows": [
              { "view": "text", "label": "Тема", "name": "theme", required:true },
              { "view": "text", type:"datetime-local", required:true, "label": "Время мероприятия", "name": "beginning", labelWidth:200},
              {cols: [
                employeesView,
                candidatesView,
                ]
              },
              { view:"select", label:"Статус", name:"status", options:[
                EVENT_STATUS.planned,
                EVENT_STATUS.inProgress,
                EVENT_STATUS.finished
              ] 
              },
              { "view": "button", "css": "webix_primary", "label": "Добавить", "id":"createWindowButton", "height": 40 }
            ]
          }
        ]
      }

      let createWindow = {
            view:"window",
            height:300,
            width:1100,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно создания" },
                    { view:"button", label: 'Close', id:"createWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:createBody,
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
                  "template": "Вы уверены, что хотите удалить мероприятие '" + event.theme + "'\n, назначенное на " + event.beginning,
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

    viewUpdateWindow(employees, candidates, employeesMultiselectValue, candidatesMultiselectValue){
      
      let employeesMultiselect =  {
        "options": employees,
        "label": "Сотрудники",
        "id":"employeesMultiselect",
        "view": "multiselect",
        "value": employeesMultiselectValue,
        "height": 38
      }

      let candidatesMultiselect = {
        "options": candidates,
        "label": "Кандидаты",
        "id":"candidatesMultiselect",
        "view": "multiselect",
        "value": candidatesMultiselectValue,
        "height": 38
      }
      
      let updateWindow = {
            view:"window",
            height:300,
            width:1100,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно изменения" },
                    { view:"button", label: 'Close', id:"updateWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "cols": [
                {
                  "autoheight": false,
                  "view": "form",
                  id:"updateForm",
                  "rows": [
                    { view: "text", name:"ID", hidden:true},
                    { "view":"text", "label": "Тема", "name": "theme", inputWidth:500},
                    { "view": "text", type:"datetime-local", "label": "Время мероприятия", "name": "beginning", labelWidth:200},
                    {cols: [
                    employeesMultiselect,
                    candidatesMultiselect,
                  ]},
                  { view:"select", label:"Статус", name:"status", options:[
                    EVENT_STATUS.planned,
                    EVENT_STATUS.inProgress,
                    EVENT_STATUS.finished
                  ] 
                    },
                    { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton", "height": 38 }
                  ]
                }
              ]
            },
            close: true,
            id: "updateWindow"
      }

      return updateWindow
    }

    viewAboutWindow(event){
      
      let employeesDatatable = {
            // "data": employees,
            "columns": [
              { "id": "ID", "header":"Номер", "sort":"number"},
              { "id": "firstname", "header": "Имя", "fillspace": true, "sort": "string" },
              { "id": "lastname", "header": "Фамилия", "fillspace": true, "sort": "string" },
              { "id": "patronymic", "header": "Отчество", "fillspace": true, "sort": "string" },
              { "id": "position", "header": "Должность", "sort": "string" },
              { "id": "email", "header": "Email", "sort": "string" },
              { "id": "phone", "header": "Телефон", "sort": "string" }
            ],
            "view": "datatable",
            "id":"employeesAbout"
      }
      let candidatesDatatable = {
            // "data": candidates,
            "columns": [
              { "id": "ID", "header":"Номер", "sort":"number", "fillspace": true,},
              { "id": "firstname", "header": "Имя",  },
              { "id": "lastname", "header": "Фамилия",  },
              { "id": "patronymic", "header": "Отчество",  },
              { "id": "email", "header": "Email", "sort": "string" },
              { "id": "phone", "header": "Телефон", "sort": "string", "fillspace": true,},
              { "id": "status", "header": "Статус", "sort": "string", "fillspace": true, }
            ],
            "view": "datatable",
            "id":"candidatesAbout"
      }
      let eventInformation = {
            "view":"property",
            "elements":[
              { "label": "Информация", "type": "label" },
              { "label": "Тема", "type": "text", "value":event.theme, "readonly":true },
              { "label": "Время", "type":"text", "value":event.beginning, "readonly":true }
            ]
      }
      let aboutWindow = {
            view:"window",
            height:500,
            width:1100,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно информации" },
                    { view:"button", label: 'Close', id:"aboutWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              rows:[
                eventInformation,
                {view:"resizer"},
                {
                  cols:[
                    employeesDatatable,
                    candidatesDatatable
                  ]
                }
              ]              
            },
            close: true,
            id: "aboutWindow"
          }      
      return aboutWindow
    }

    viewFinishWindow(event){
      let eventInformation = {
        "view":"property",
        "elements":[
          { "label": "Информация", "type": "label" },
          { "label": "Тема", "type": "text", "value":event.theme, "readonly":true },
          { "label": "Время", "type":"text", "value":event.beginning, "readonly":true }
        ]
      }
      let candidatesDatatable = {
        // "data": candidates,
        "columns": [
          { "id": "ID", "header":"Номер", "sort":"number", "fillspace": true,},
          { "id": "firstname", "header": "Имя",  },
          { "id": "lastname", "header": "Фамилия",  },
          { "id": "patronymic", "header": "Отчество",  },
          { "id": "email", "header": "Email", "sort": "string" },
          { "id": "phone", "header": "Телефон", "sort": "string", "fillspace": true,},
          { "id": "status", "header": "Статус", "sort": "string", "fillspace": true, }
        ],
        "view": "datatable",
        "id":"finishCandidates"
      }
      let finishWindow = {
        view:"window",
        height:500,
        width:1100,
        head:{
            view:"toolbar", cols:[
                { view:"label", label: "Окно завершения" },
                { view:"button", label: 'Close', id:"finishWindowClose" , width: 100, align: 'right'}
              ]
        },
        position:"center",
        body:{
          rows:[
            eventInformation,
            {view:"resizer"},
            candidatesDatatable,
            { "view": "button", "css": "webix_primary", "label": "Завершить", "id":"finishWindowButton", "height": 38, "width":0}
          ],
          
        },
        close: true,
        id: "finishWindow"
      }

      return finishWindow
    }
}
  

