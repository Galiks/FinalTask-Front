import { Candidate } from "./../../models/entities/Candidate.js";
import { CANDIDATE_STATUS } from "./CandidateTabController.js";

export class CandidateWindowView{
    constructor(){

    }

    /**
     * Создаёт конфиг WEBIX для отображения окна создания кандидата
     * @returns  Конфиг окна для создания кандидата
     */
    viewCreateWindow(){
      let createWindow = {
          view:"window",
          height:400,
          width:300,
          head:{
              view:"toolbar", cols:[
                  { view:"label", label: "Окно создания" },
                  { view:"button", label: 'Close', id:"createWindowClose" , width: 100, align: 'right'}
                ]
          },
          position:"center",
          body:{
            "id":"createForm",
            "autoheight": false,
            "view": "form",
            "elements": [
              { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text" },
              { "view": "text", "label": "Имя", "name": "firstname", "type":"text" },
              { "view": "text", "label": "Отчество", "name": "patronymic", "type":"text" },
              { "view": "text", "label": "Email", "name": "email", "type":"text" },
              { "view": "text", "label": "Телефон", "name": "phone", "type":"text" },
              { "view":"select", "label":"Статус", "name":"status", "options":[
                CANDIDATE_STATUS.invite,
                CANDIDATE_STATUS.showUp,
                CANDIDATE_STATUS.dontShowUp,
                CANDIDATE_STATUS.wait,
                CANDIDATE_STATUS.success,
                CANDIDATE_STATUS.unsuccess
            ] },
              { "view": "button", "css": "webix_primary", "label": "Создать", "id":"createWindowButton" }
            ]
          },
          close: true,
          id: "createWindow"
        }
        return createWindow;
      }

      /**
       * Создаёт конфиг WEBIX для отображения окна удаления кандидата
       * @param {Candidate} candidate 
       * @returns Конфиг окна удаления кандидата
       */
      viewDeleteWindow(candidate){
        let deleteWindow = {
          view:"window",
          height: 300,
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
                  "elements": [
                      { "label": "Хотите удалить?", "type": "label" },
                      { "label": "ФИО", "type": "text", "value": candidate.lastname + " " + candidate.firstname + " " + candidate.patronymic },
                      { "label": "Email", "type":"text", "value": candidate.email },
                      { "label": "Телефон", "type":"text", "value": candidate.phone },
                    ],
                    "view": "property"
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
          height:450,
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
              { "view":"text", "label":"Номер", "name":"ID", "type":"number", "readonly":true},
              { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text" },
              { "view": "text", "label": "Имя", "name": "firstname", "type":"text" },
              { "view": "text", "label": "Отчество", "name": "patronymic", "type":"text" },
              { "view": "text", "label": "Email", "name": "email", "type":"text" },
              { "view": "text", "label": "Телефон", "name": "phone", "type":"text" },
              { view:"select", label:"Статус", name:"status", options:[
                  CANDIDATE_STATUS.invite,
                  CANDIDATE_STATUS.showUp,
                  CANDIDATE_STATUS.dontShowUp,
                  CANDIDATE_STATUS.wait,
                  CANDIDATE_STATUS.success,
                  CANDIDATE_STATUS.unsuccess
              ] },
              // { "view": "text", "name": "id_candidates_status ", "type":"number", "hidden":true },
              { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton" }
            ]
          },
          close: true,
          id: "updateWindow"
        }

        return updateWindow
      }

      /**
       * 
       * @param {Candidate} candidate 
       */
      viewAboutWindow(candidate){
        let aboutWindow = {
          view:"window",
          height:300,
          width:300,
          head:{
              view:"toolbar", cols:[
                  { view:"label", label: "Окно информации" },
                  { view:"button", label: 'Close', id:"aboutWindowClose" , width: 100, align: 'right'}
                ]
          },
          position:"center",
          body:{
            "elements": [
              { "label": "Информация", "type": "label" },
              { "label": "ФИО", "type": "text", "value": candidate.lastname + " " + candidate.firstname + " " + candidate.patronymic },
              { "label": "Email", "type":"text", "value": candidate.email },
              { "label": "Телефон", "type":"text", "value": candidate.phone },
            ],
            "view": "property"
          },
          close: true,
          id: "aboutWindow",
        }

        return aboutWindow
      }
}