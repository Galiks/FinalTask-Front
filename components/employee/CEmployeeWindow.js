import { Employee } from '../../models/entities/Employee.js';
import { EmployeeModel } from '../../models/EmployeeModel.js';
import { EmployeeWindowView } from './EmployeeWindowView.js'

export class EmployeeWindowController{
    constructor(){
        this.employeeWindowView = new EmployeeWindowView()
        this.employeeModel = new EmployeeModel()
    }

    init(){

    }

    attachEventEventOnHideWindow(window){
        $$(window).attachEvent("onHide", ()=> {
            this.closeWindow(window)
        })
    }

    isEmptyString(){
        for (let index = 0; index < arguments.length; index++) {
            const element = arguments[index];
            if (element.trim() == ''){
                return true
            }
        }
        return false
    }

    /**
     * Метод закрывает указанное окно и разблокирует главное окно
     * @param {string} window ID окна
     */
    closeWindow(window) {
        $$(window).close();
        $$("main").enable();
    }

    refreshEmployeeDatatable(){
        let employees = this.employeeModel.getEmloyees()
        if (employees.length == 0) {
            employees.push(new Employee(0, null, null, null, null, null, null, null))
        }
        $$("employees").clearAll()
        $$("employees").define("data", employees)
        $$("employees").refresh()
    }

    attachEmployeeOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("createWindow")
        })

        this.attachEventEventOnHideWindow("createWindow")

        $$("createWindowButton").attachEvent("onItemClick", ()=>{

            var form = $$("createForm");
            if (!form.validate()){
                webix.message({ type:"error", text:"Form data is invalid" });
            }
            let values = form.getValues()
            let id = this.employeeModel.getLastID() + 1
            if (this.isEmptyString(values.firstname, values.lastname, values.patronymic, values.position, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                this.closeWindow("createWindow");
                return
            }
            this.employeeModel.createEmployee(
                new Employee(id, values.firstname, values.lastname, values.patronymic, values.position,
                    values.email, values.phone))
    
            this.refreshEmployeeDatatable()
            this.closeWindow("createWindow");
        })


    }

    attachEmployeeOnUpdateWindow(employee){
        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("updateWindow")   
        });

        this.attachEventEventOnHideWindow("updateWindow")

        $$("updateForm").setValues({
            ID: employee.ID,
            firstname: employee.firstname,
            lastname: employee.lastname,
            patronymic: employee.patronymic,
            position: employee.position,
            email: employee.email,
            phone: employee.phone
        });

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            let values = $$("updateForm").getValues()
            if (this.isEmptyString(values.firstname, values.lastname, values.patronymic, values.position, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                this.closeWindow("updateWindow");
                return
            }
            this.employeeModel.updateEmployee(new Employee(
                values.ID, values.firstname, values.lastname, values.patronymic, values.position,
                values.email, values.phone))
            this.closeWindow("updateWindow")    
            this.refreshEmployeeDatatable()
        })
          
    }

    attachEmployeeOnDeleteWindow(employee){
        $$("deleteWindowClose").attachEvent("onItemClick", () => {
            this.closeWindow("deleteWindow")      
        })

        this.attachEventEventOnHideWindow("deleteWindow")

        $$("deleteWindowButtonYes").attachEvent("onItemClick", (id) =>{
            this.employeeModel.deleteEmployee(employee.ID)
            this.closeWindow("deleteWindow")
            this.refreshEmployeeDatatable()
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")
        })
    }

    attachEmployeeOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("aboutWindow")    
        })

        this.attachEventEventOnHideWindow("aboutWindow")
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