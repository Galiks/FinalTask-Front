import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateTabView{
    constructor(){

    }

    /**
     * 
     * @param {Candidate[]} candidates 
     */
    view(candidates){

        let buttonHeader = {
            "css": "webix_dark",
            "view": "toolbar",
            "height": 0,
            "autowidth": true,
            "cols": [
                { "view": "button", "label": "Мероприятия", "id":"eventButton", "height": 0, "width": 150 },
                { "view": "button", "label": "Сотрудники", "id":"employeeButton", "height": 0, "width": 150 },
                { "view": "button", "label": "Кандидаты", "id":"candidateButton",  "height": 0, "width": 150 }
            ]
        }

        let userWindow = {
            "rows": [
                { "icon": "wxi-user", "view": "icon", "height": 0, "width": 0 },
                { "label": "Login", "view": "button", "height": 0 }
            ]
        }

        let title = {
            view:"template", 
            template:"<strong>Список кандидатов</strong>", 
            type:"header"
        }

        let candidateData = {
            "data": candidates,
            "columns": [
                { "id": "ID", "header":"Номер", "sort":"number"},
                { "id": "firstname", "header": "Имя", "fillspace": true, "sort": "string" },
                { "id": "lastname", "header": "Фамилия", "fillspace": true, "sort": "string" },
                { "id": "patronymic", "header": "Отчество", "fillspace": true, "sort": "string" },
                { "id": "email", "header": "Email", "sort": "string" },
                { "id": "phone", "header": "Телефон", "sort": "string" }
            ],
            "view": "datatable",
            "height": 0,
            "select": "row",
            "id": "candidate"
        }

        return {
            "rows": [
                {
                    "height": 74,
                    "cols": [
                        buttonHeader,
                        {
                            "view":"template", 
                            "template":"Добро пожаловать в приложение!"
                        },
                        userWindow
                    ]
                },
                title,
                candidateData
            ],
            "borderless": false
        }
    }
}