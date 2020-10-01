import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateTabView{
    constructor(){

    }

    /**
     * 
     * @param {Candidate[]} candidates 
     */
    view(candidates){

        let contextmenu = {
            view:"contextmenu",
            id:"candidatecmenu",
            data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"]
        }

        webix.ui(contextmenu)

        return {
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
            "select": true,
            "id": "candidates",
            "onContext":{}
        }
    }
}