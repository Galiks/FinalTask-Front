import { Employee } from "./../../models/entities/Employee.js";

export class EmployeeTabView{
    /**
     * 
     * @param {Employee[]} employees
     */
    view(employees){
        return {
            "data": employees,
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
            "height": 0,
            "select": true,
            "id": "employees",
            "onContext":{}
        }      
    }
}