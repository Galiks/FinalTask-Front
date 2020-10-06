import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateTabView{
    constructor(){

    }

    /**
     * 
     * @param {Candidate[]} candidates 
     */
    view(candidates){

        let data

        if (candidates.length == 0){
            candidates.push(new Candidate())
            data = ["Добавить"]
        }else{
            data = ["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"]
        }

        let contextmenu = {
            view:"contextmenu",
            id:"candidatecmenu",
            data:data
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