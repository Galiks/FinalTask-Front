import {Employee} from './entities/Employee.js'

export class EmployeeModel{
    //key - id, value - employee
    constructor(){
        this.employees = new Map();
        this.employees.set(1, new Employee(1, "ivan", "ivanov", "ivanovich", "programmer", "email@email.com", "888888", ))
        this.employees.set(2, new Employee(2, "ivan2", "ivanov2", "ivanovich2", "programmer2", "222email@email.com", "22888888", 2))
    }

    getLastID(){
        return new Promise((resolve, reject) =>{
            if (this.employees.size == 0) {
                resolve(0)
            }
            else{
                let keys = Array.from(this.employees.keys());
                resolve(Math.max.apply(null, keys))
            }
        })
    }

    getEmloyees() {
        return new Promise((resolve, reject)=>{
            resolve(Array.from(this.employees.values()))
        })
    }

    /**
     * Метод возвращает данные о сотрудниках в формате {ID, VALUE}, где
     * ID - ID,
     * VALUE - position + lastname + firstname + patronymic
     * @returns {Array} Массив объектов {ID, VALUE}
     */
    getEmployeesLikeIDValue(){
        return new Promise((resolve, reject)=>{
            let result = []
            this.employees.forEach(e => {
                result.push({id:e.ID, value:e.position + ' ' + e.lastname + ' ' + e.firstname + ' ' + e.patronymic})
            });
            resolve(result)
        })
    }

    /**
     * 
     * @param {number} id 
     */
     getEmployeeByID(id) {
        return new Promise((resolve, reject)=>{
            resolve(this.employees.get(Number(id)))
        })
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; position: string; email: string; phone: string; id_user: number; }} employee 
     */
     createEmployee(employee) {
        return new Promise((resolve, reject)=>{
            let newEmployee = new Employee(employee.ID, employee.firstname, employee.lastname, employee.patronymic, employee.position, employee.email, employee.phone, employee.id_user)
            this.employees.set(employee.ID, newEmployee)  
            resolve(newEmployee)
        })
    }

     updateEmployee(employee){
        return new Promise((resolve, reject)=>{
            let updatingEmployee = this.getEmployeeByID(employee.ID)
            if (updatingEmployee != null) {
                this.employees.set(employee.ID, updatingEmployee)
                resolve(updatingEmployee)
            } else {
                reject(null)
            }
        })
    }

    deleteEmployee(id){
        return new Promise((resolve, reject)=>{
            let deletingEmployee = this.getEmployeeByID(id)
            if (deletingEmployee != null) {
                this.employees.delete(Number(id))
                resolve()
            } else {
                reject()
            }  
        })
    }
}