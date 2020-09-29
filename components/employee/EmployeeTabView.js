import { Employee } from "./../../models/entities/Employee.js";

export class EmployeeTabView{
    /**
     * 
     * @param {Employee[]} employees
     */
    view(employees){
            return {
                "rows": [
                    {
                        "height": 74,
                        "cols": [
                            {
                                "options": [
                                    { "id": "eventsButton", "value": "Мероприятие" },
                                    { "id": "employeesButton", "value": "Сотрудники"},
                                    { "id": "candidatesButton", "value": "Кандидаты"}
                                ],
                                "view": "tabbar",
                                "height": 0
                            },
                            {
                                "rows": [
                                    { "icon": "wxi-user", "view": "icon", "height": 0, "width": 0 },
                                    { "label": "Login", "view": "button", "height": 0 }
                                ]
                            }
                        ]
                    },
                    {
                        view:"template", 
                        template:"<strong>Список сотрудников</strong>", 
                        type:"header"
                    },
                    {
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
                        "select": "row",
                        "id": "employees"
                    }
                ],
                "borderless": false
            }
        
    }
}