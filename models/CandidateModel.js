import {Candidate} from './entities/Candidate.js'

export class CandidateModel{
    constructor(){
        this.candidates = new Map()
        this.candidates.set(1, new Candidate(1, "ivan", "ivanov", "ivanovich", "email@email.com", "888888", 1))
        this.candidates.set(2, new Candidate(2, "ivan2", "ivanov2", "ivanovich2", "222email@email.com", "22888888", 2))

        this.candidateEvent = [
            {   
                employeeID: 0,
                eventID: 0
            }
        ]
    }

    getCandidates(){
        return Array.from(this.candidates.values())
    }

    /**
     * 
     * @param {number} id 
     */
    getCandidateByID(id){
        return this.candidates.get(id)
    }

    getCandidatesByEvent(id){
        alert("DID NOTHING")
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    createCandidate(candidate){
        let id = this.candidates.size + 1
        let newCandidate = new Candidate(id, candidate.firstname, candidate.lastname, candidate.patronymic, candidate.email, candidate.phone, candidate.id_candidates_status)
        this.candidates.set(id, newCandidate)
        return newCandidate
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    updateCandidate(candidate){
        let updatingCandidate = this.getCandidateById(candidate.id)

        updatingCandidate.ID = candidate.id
        updatingCandidate.firstname = candidate.firstname
        updatingCandidate.lastname = candidate.lastname
        updatingCandidate.patronymic = candidate.patronymic
        updatingCandidate.email = candidate.email
        updatingCandidate.phone = candidate.phone
        updatingCandidate.id_candidates_status = candidate.id_candidates_status

        return updatingCandidate
    }

    /**
     * 
     * @param {number} id 
     */
    deleteCandidate(id){
        this.candidates.delete(id)
    }
}