import { EventModel } from "../../models/EventModel.js";
import { EventWindowController } from "./CEventWindow.js";
import { EventTabView } from "./EventTabView.js";
import { EmployeeModel } from "./../../models/EmployeeModel.js";
import { CandidateModel } from "./../../models/CandidateModel.js";

export class EventTabController{
    constructor(){
        this.eventTabView = new EventTabView()
        this.eventWindowController = new EventWindowController()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.eventWindowController.init()

        this.datatable = $$("events")
        this.cmenu = $$("eventcmenu")

        this.eventWindowController.refreshDatatable("events")

        this.attachEvent()
    }

    /**
     * Метод для отрисовки главного элемента мероприятий
     * @returns конфигурация WEBIX 
     */
    config(){
        return this.eventTabView.view()
    }

    /**
     * Метод для привыязки событий
     */
    attachEvent(){
        this.cmenu.attachTo(this.datatable);
        this.attachEventToContextMenu(this)
    }

    /**
     * Метод для привязки событий к контекстному меню
     * @param {CEventTab} controller контекст класса CEventTab
     */
    attachEventToContextMenu(controller){
        this.cmenu.attachEvent("onItemClick", function(id){
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let event = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){             
                controller.eventWindowController.createWindow()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.eventWindowController.deleteWindow(event)        
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.eventWindowController.updateWindow(event)
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.eventWindowController.aboutWindow(event)
            }
            else if (this.getItem(id).value == "Завершить"){
                controller.eventWindowController.finishWindow(event)
            }  
        })
    }
}