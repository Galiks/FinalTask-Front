import { EmployeeWindowController } from "./CEmployeeWindow.js";
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { EmployeeTabView } from "./EmployeeTabView.js";

export class EmployeeTabController{

    constructor(){
        this.employeeWindowController = new EmployeeWindowController()
        this.employeeModel = new EmployeeModel()
        this.employeeTabView = new EmployeeTabView()
    }

    init(){

        this.datatable = $$("employees")
        this.cmenu = $$("employeecmenu")

        this.employeeWindowController.init()
        this.attachEvent()
    }

    config(){
        return this.employeeTabView.view()
    }

    attachEvent(){
        this.cmenu.attachTo(this.datatable);
        this.attachEventWindowHandler(this)
    }

    /**
     * 
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        this.cmenu.attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            // let constructorName = element.constructor.name
            if (this.getItem(id).value == "Добавить"){   
                controller.employeeWindowController.createEmployee()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.employeeWindowController.deleteEmployee(element)
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.employeeWindowController.updateEmployee(element)          
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.employeeWindowController.aboutEmployee(element)
            }           
          });
    }
}