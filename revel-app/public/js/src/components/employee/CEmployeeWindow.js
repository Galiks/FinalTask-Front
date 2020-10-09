import { EmployeeModel } from '../../models/EmployeeModel.js';
import { EmployeeWindowView } from './EmployeeWindowView.js'

export class CEmployeeWindow{
    constructor(){
        this.employeeWindowView = new EmployeeWindowView()
        this.employeeModel = new EmployeeModel()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.datatable = $$("employees")
        this.cmenu = $$("employeecmenu")
    }

    /**
     * Метод для привязки события на скрытие окна к окну
     * @param {string} window имя окна
     */
    attachEventEventOnHideWindow(window){
        $$(window).attachEvent("onHide", ()=> {
            this.closeWindow(window)
        })
    }

    /**
     * Метод для проверки строк на пустоту
     */
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
     * Метод обновляет данные в таблице employees
     */
    refreshDatatable(){
        this.employeeModel.getEmloyees().then((data)=>{
            if (data.length == 0) {
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить"])
                this.cmenu.refresh()
                let empty = [new Object]
                this.refreshDatatableData(empty)
            }else{
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить","Удалить", "Изменить", { $template:"Separator" },"Подробнее"])
                this.cmenu.refresh()
                this.refreshDatatableData(data);
            }
        })
    }

    /**
     * Метод для обновления данных в таблице employees
     * @param {Array} data массив данных
     */
    refreshDatatableData(data) {
        this.datatable.clearAll();
        this.datatable.parse(data);
        this.datatable.refresh();
    }

    /**
     * Метод закрывает указанное окно и разблокирует главное окно
     * @param {string} window ID окна
     */
    closeWindow(window) {
        $$(window).close();
        $$("main").enable();
    }

    /**
     * Метод показывает указанное окно и блокирует главное окно
     * @param {string} window ID окна
     */
    showWindow(window){
        $$(window).show()
        $$("main").disable()
    }

    attachEmployeeOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("createWindow")
        })

        this.attachEventEventOnHideWindow("createWindow")

        $$("createWindowButton").attachEvent("onItemClick", ()=>{

            var form = $$("createForm");
            if (!form.validate()){
                webix.message("Email имеет неверный формат!")
                $$("createForm").clear()
                return
            }
            let values = this.fetch("createForm")
            if (this.isEmptyString(values.firstname, values.lastname, values.position, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            this.employeeModel.createEmployee(values).then(()=>{
                this.refreshDatatable()
                this.closeWindow("createWindow");
            })
        })
    }

    attachEmployeeOnUpdateWindow(employee){

        this.parse("updateForm", employee)

        

        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("updateWindow")   
        });

        this.attachEventEventOnHideWindow("updateWindow")

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{

            var form = $$("updateForm");
            if (!form.validate()){
                webix.message("Email имеет неверный формат!")
                $$("updateForm").clear()
                return
            }

            let values = this.fetch("updateForm")
            if (this.isEmptyString(values.firstname, values.lastname, values.patronymic, values.position, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                $$("updateForm").clear()
                return
            }
            this.employeeModel.updateEmployee(values).then(()=>{
                this.closeWindow("updateWindow")    
                this.refreshDatatable()
            })
        })
          
    }

    attachEmployeeOnDeleteWindow(employee){
        $$("deleteWindowClose").attachEvent("onItemClick", () => {
            this.closeWindow("deleteWindow")      
        })

        this.attachEventEventOnHideWindow("deleteWindow")

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.employeeModel.deleteEmployee(employee.ID).then(()=>{
                this.closeWindow("deleteWindow")
                this.refreshDatatable()
            })
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

    createWindow(){
        webix.ui(this.employeeWindowView.viewCreateWindow())
        this.attachEmployeeOnCreateWindow()
        this.showWindow("createWindow")
    }

    deleteWindow(employee){
        webix.ui(this.employeeWindowView.viewDeleteWindow(employee))
        this.attachEmployeeOnDeleteWindow(employee)
        this.showWindow("deleteWindow")
    }

    updateWindow(employee){
        webix.ui(this.employeeWindowView.viewUpdateWindow())
        this.attachEmployeeOnUpdateWindow(employee)
        this.showWindow("updateWindow")
    }

    aboutWindow(employee){
        webix.ui(this.employeeWindowView.viewAboutWindow(employee))
        this.attachEmployeeOnAboutWindow()
        this.showWindow("aboutWindow")
    }

     /**
     * Метод возвращает данные с формы
     * @param {string} formName имя формы
     * @returns данные с формы
     */
    fetch(formName){
        return $$(formName).getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {string} formName имя формы
     * @param {*} values значения
     */
    parse(formName, values){
        $$(formName).setValues(values)
    }
}