import {Employee} from './entities/Employee.js'

export class EmployeeModel{
    //key - id, value - employee
    constructor(){
        this.employees = new Map();
        this.employees.set(1, new Employee(1, "ivan", "ivanov", "ivanovich", "programmer", "email@email.com", "888888", 1))
        this.employees.set(2, new Employee(2, "ivan2", "ivanov2", "ivanovich2", "programmer2", "222email@email.com", "22888888", 2))
        //{employeeID: {number}, {eventID : {number}}}
        this.employeeEvent = [
            {   
                employeeID: 0,
                eventID: 0
            }
        ]
    }

     getEmloyees() {
        return Array.from(this.employees.values())
    }

    /**
     * 
     * @param {number} id 
     */
     getEmployeeByID(id) {
        let employee = this.employees.get(id)

        return employee
    }

     getEmployeesByEvent(id) {
        //   ¯ \ _ (ツ) _ / ¯
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; position: string; email: string; phone: string; id_user: number; }} employee 
     */
     createEmployee(employee) {
        let id = employees.size + 1
        let newEmployee = new Employee(id, employee.firstname, employee.lastname, employee.patronymic, employee.position, employee.email, employee.phone, employee.id_user)
        employees.set(id, newEmployee)
    }

     updateEmployee(employee){
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

     deleteEmployee(id){
        employees.delete(id)
    }

    getEmployeeByEventID(id_event){
        let employeesArray = []

        this.employeeEvents.forEach(element =>{
            if (element.eventID == id_event) {
                employeesArray.push(this.getEmployeeByID(element.employeeID))
            }
        })

        return employeesArray
    }

    setEmployeeToEvent(id_employee, id_event){
        this.employeeEvent.push({employeeID: id_employee, eventID: id_event})
    }

     deleteEmployeeFromEvent(id_employee, id_event){
        for (let index = 0; index < this.employeeEvent.length; index++) {
            const element = this.employeeEvent[index];
            if (element.employeeID == id_employee && element.eventID == id_event) {
                this.employeeEvent.splice(index, 1)
            }
        }   
    }
}