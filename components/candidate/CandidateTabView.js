import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateTabView{
    constructor(){

    }

    /**
     * 
     * @param {Candidate[]} candidates 
     */
    view(candidates){

        if(candidates.length == 0){
            candidates.push(new Event(0, null, null, null))
        }

        let contextmenu = {
            view:"contextmenu",
            id:"candidatecmenu",
            data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"]
        }

        webix.ui(contextmenu)

        return {
            "data": candidates,
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
            "height": 0,
            "select": true,
            "id": "candidates",
            "onContext":{}
        }
    }
}