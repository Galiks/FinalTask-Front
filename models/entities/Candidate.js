export class Candidate{
    /**
     * 
     * @param {number} id 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} patronymic 
     * @param {string} email 
     * @param {string} phone 
     * @param {number} id_candidates_status 
     */
    constructor(id, firstname, lastname, patronymic, email, phone, id_candidates_status){
        this.ID = id;
        this.firstname = firstname
        this.lastname = lastname
        this.patronymic = patronymic
        this.email = email
        this.phone = phone
        this.id_candidates_status = id_candidates_status
    }
}