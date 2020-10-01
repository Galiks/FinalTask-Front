import {Employee} from './entities/Employee.js'

export class EmployeeModel{
    //key - id, value - employee
    constructor(){
        this.employees = new Map();
        this.employees.set(1, new Employee(1, "ivan", "ivanov", "ivanovich", "programmer", "email@email.com", "888888", ))
        this.employees.set(2, new Employee(2, "ivan2", "ivanov2", "ivanovich2", "programmer2", "222email@email.com", "22888888", 2))
        //{employeeID: {number}, {eventID : {number}}}
        this.employeeEvent = [
            {   
                employeeID: 0,
                eventID: 0
            }
        ]
    }

    getLastID(){
        let keys = Array.from(this.employees.keys());
        return Math.max.apply(null, keys)
    }

     getEmloyees() {
        return Array.from(this.employees.values())
    }

    /**
     * 
     * @param {number} id 
     */
     getEmployeeByID(id) {
        return this.employees.get(Number(id))
    }

     getEmployeesByEvent(id) {
        //   ¯ \ _ (ツ) _ / ¯
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; position: string; email: string; phone: string; id_user: number; }} employee 
     */
     createEmployee(employee) {
        let newEmployee = new Employee(employee.ID, employee.firstname, employee.lastname, employee.patronymic, employee.position, employee.email, employee.phone, employee.id_user)
        this.employees.set(employee.ID, newEmployee)
    }

     updateEmployee(employee){
        let updatingEmployee = this.getEmployeeByID(employee.ID)
        
        updatingEmployee.ID = employee.ID
        updatingEmployee.firstname = employee.firstname
        updatingEmployee.lastname = employee.lastname
        updatingEmployee.patronymic = employee.patronymic
        updatingEmployee.position = employee.position
        updatingEmployee.email = employee.email
        updatingEmployee.phone = employee.phone
        updatingEmployee.id_user = employee.id_user

        this.employees.set(employee.ID, updatingEmployee)

        return updatingEmployee
    }

     deleteEmployee(id){
        this.employees.delete(id)
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