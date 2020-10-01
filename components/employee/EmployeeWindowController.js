import { EmployeeModel } from './../../models/EmployeeModel.js';
import { EmployeeWindowView } from './EmployeeWindowView.js'

export class EmployeeWindowController{
    constructor(){
        this.employeeWindowView = new EmployeeWindowView()
        this.employeeModel = new EmployeeModel()
    }

    init(){

    }

    refreshEmployeeDatatable(){
        let employees = this.employeeModel.getEmloyees()
        $$("employees").clearAll()
        $$("employees").define("data", employees)
        $$("employees").refresh()
    }

    attachEmployeeOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", function(){
            $$("createWindow").close()
            $$("main").enable()
          })
    }

    attachEmployeeOnUpdateWindow(employee){
        $$("updateWindowClose").attachEvent("onItemClick", function(){
            $$("updateWindow").close()
            $$("main").enable()      
          });

          $$("updateForm").setValues({
            firstname: employee.firstname,
            lastname: employee.lastname,
            patronymic: employee.patronymic,
            position: employee.position,
            email: employee.email,
            phone: employee.phone
        })
          
    }

    attachEmployeeOnDeleteWindow(employee){
        $$("deleteWindowClose").attachEvent("onItemClick", function(){
            $$("deleteWindow").close()
            $$("main").enable()      
          })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", (id) =>{
            this.employeeModel.deleteEmployee(employee.ID)
            $$("deleteWindow").close()
            $$("main").enable()

            this.refreshEmployeeDatatable()

            // let columns = $$('events').get
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            $$("deleteWindow").close()
            $$("main").enable() 
        })
    }

    attachEmployeeOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", function(){
            $$("aboutWindow").close()
            $$("main").enable()      
          })
    }

    createEmployee(){
        webix.ui(this.employeeWindowView.viewCreateWindow())
        this.attachEmployeeOnCreateWindow()
    }

    deleteEmployee(employee){
        webix.ui(this.employeeWindowView.viewDeleteWindow(employee))
        this.attachEmployeeOnDeleteWindow(employee)
    }

    updateEmployee(employee){
        webix.ui(this.employeeWindowView.viewUpdateWindow())
        this.attachEmployeeOnUpdateWindow(employee)
    }

    aboutEmployee(employee){
        webix.ui(this.employeeWindowView.viewAboutWindow(employee))
        this.attachEmployeeOnAboutWindow()
    }
}