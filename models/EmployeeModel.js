import {Employee} from './entities/Employee'

export class EmployeeModel{
    //key - id, value - employee
    constructor(){
        this.employees = new Map();
    }

    static getEmloyees() {
        return this.employees
    }

    /**
     * 
     * @param {number} id 
     */
    static getEmployeeByID(id) {
        let employee = this.employees.get(id)

        return employee
    }

    static getEmployeesByEvent(id) {
        //   ¯ \ _ (ツ) _ / ¯
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; position: string; email: string; phone: string; id_user: number; }} employee 
     */
    static createEmployee(employee) {
        let id = employees.size + 1
        let newEmployee = new Employee(id, employee.firstname, employee.lastname, employee.patronymic, employee.position, employee.email, employee.phone, employee.id_user)
        employees.set(id, newEmployee)
    }

    static updateEmployee(employee){
        updatingEmployee = this.getEmployeeByID(employee.id)
        updatingEmployee.ID = employee.ID
        updatingEmployee.firstname = employee.firstname
        updatingEmployee.lastname = employee.lastname
        updatingEmployee.patronymic = employee.patronymic
        updatingEmployee.position = employee.position
        updatingEmployee.email = employee.email
        updatingEmployee.phone = employee.phone
        updatingEmployee.id_user = employee.id_user

        return updatingEmployee
    }

    static deleteEmployee(id){
        employees.delete(id)
    }
}