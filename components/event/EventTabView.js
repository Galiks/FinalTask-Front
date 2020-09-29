import { Event } from './../../models/entities/Event.js';

export class EventTabView{

    /**
     * 
     * @param {Event[]} events
     */
     view(events){
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
                    "data": events,
                    "columns": [
                        { "id": "ID", "header": "Номер", "sort": "number" },
                        { "id": "theme", "header": "Тема", "fillspace": true, "sort": "string" },
                        { "id": "beginning", "header": "Начало", "fillspace":true, "sort": "Date" },
                        { "id": "id_events_status", "header": "Статус", "sort": "number" }
                    ],
                    "view": "datatable",
                    "height": 0
                }
            ],
            "borderless": false
        }
    }
}