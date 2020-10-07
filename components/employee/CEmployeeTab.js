import { EmployeeWindowController } from "./CEmployeeWindow.js";
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { EmployeeTabView } from "./EmployeeTabView.js";

export class EmployeeTabController{

    constructor(){
        this.employeeWindowController = new EmployeeWindowController()
        this.employeeTabView = new EmployeeTabView()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.datatable = $$("employees")
        this.cmenu = $$("employeecmenu")

        this.employeeWindowController.init()
        this.employeeWindowController.refreshDatatable()
        this.attachEvent()
    }

    /**
     * Метод отрисовывает главный элемент сотрудников
     * @returns конфигурация WEBIX
     */
    config(){
        return this.employeeTabView.view()
    }

    /**
     * Метод для привязки событий
     */
    attachEvent(){
        this.cmenu.attachTo(this.datatable);
        this.attachEventWindowHandler(this)
    }

    /**
     * Метод для привязки событий к контекстному меню
     * @param {this} controller контекст класса CEmployeeTab
     */
    attachEventWindowHandler(controller){
        this.cmenu.attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){   
                controller.employeeWindowController.createWindow()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.employeeWindowController.deleteWindow(element)
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.employeeWindowController.updateWindow(element)          
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.employeeWindowController.aboutWindow(element)
            }           
          });
    }
}