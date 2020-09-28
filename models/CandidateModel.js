import {Candidate} from './entities/Candidate'

export class CandidateModel{
    constructor(){
        this.candidates = new Map()
    }

    static getCandidates(){
        return this.candidates
    }

    /**
     * 
     * @param {number} id 
     */
    static getCandidateById(id){
        return this.candidates.get(id)
    }

    static getCandidatesByEvent(id){
        throw
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    static createCandidate(candidate){
        let id = this.candidates.size + 1
        let newCandidate = new Candidate(id, candidate.firstname, candidate.lastname, candidate.patronymic, candidate.email, candidate.phone, candidate.id_candidates_status)
        this.candidates.set(id, newCandidate)
        return newCandidate
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    static updateCandidate(candidate){
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
    static deleteCandidate(id){
        this.candidates.delete(id)
    }
}