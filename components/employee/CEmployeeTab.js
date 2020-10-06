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
        this.employeeWindowController.init()
        this.attachEvent()
        this.attachEventWindowHandler(this)
    }

    config(){
        return this.employeeTabView.view(this.employeeModel.getEmloyees())
    }

    attachEvent(){
        $$("employeecmenu").attachTo($$("employees"));
    }

    /**
     * 
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        $$("employeecmenu").attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            // let constructorName = element.constructor.name
            if (this.getItem(id).value == "Добавить"){   
                controller.employeeWindowController.createEmployee()
                $$("createWindow").show()
                $$("main").disable()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.employeeWindowController.deleteEmployee(element)
              $$("deleteWindow").show()
              $$("main").disable()
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.employeeWindowController.updateEmployee(element)          
              $$("updateWindow").show()
              $$("main").disable()
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.employeeWindowController.aboutEmployee(element)
              $$("aboutWindow").show()
              $$("main").disable()
            }           
          });
    }
}