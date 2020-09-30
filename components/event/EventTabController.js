import { EventModel } from './../../models/EventModel.js'
import { EventWindowController } from "./EventWindowController.js";
import { EventTabView } from './EventTabView.js';

export class EventTabController{

    constructor(){  
        this.eventWindowController = new EventWindowController()
        this.eventTabView = new EventTabView()
        this.eventModule = new EventModel()
    }

    init(){
        this.eventWindowController.init()

        // let view = this.eventTabView.view(this.eventModule.getEvents())

        this.attachEvent()
        this.attachEventWindowHandler(this)
    }

    /**
     * @returns Layout of Webix
     */
    config(){
        return this.eventTabView.view(this.eventModule.getEvents())
    }

    attachEvent(){

        $$("cmenu").attachTo($$("events"));
    }

    showEventsByID(action, id = null){
        if (action == "Добавить") {
            this.eventWindowController.show()
        }
    }

    /**
     * 
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        $$("cmenu").attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            let constructorName = element.constructor.name
            if (this.getItem(id).value == "Добавить"){   
                controller.eventWindowController.createEvent()
                $$("createWindow").show()
                $$("main").disable()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.eventWindowController.deleteEvent(element)
              $$("deleteWindow").show()
              $$("main").disable()
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.eventWindowController.updateEvent(element)          
              $$("updateWindow").show()
              $$("main").disable()
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.eventWindowController.aboutEvent(element)
              $$("aboutWindow").show()
              $$("main").disable()
            }           
          });
    }
}