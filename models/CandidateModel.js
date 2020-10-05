import { CANDIDATE_STATUS } from '../components/candidate/CCandidateTab.js'
import {Candidate} from './entities/Candidate.js'

export class CandidateModel{
    constructor(){
        this.candidates = new Map()

        this.candidates.set(Number(1), new Candidate(1, "ivan", "ivanov", "ivanovich", "email@email.com", "888888", CANDIDATE_STATUS.empty))
        this.candidates.set(Number(2), new Candidate(2, "ivan2", "ivanov2", "ivanovich2", "222email@email.com", "22888888", CANDIDATE_STATUS.empty))
    }

    getLastID(){
        let keys = Array.from(this.candidates.keys());
        return Math.max.apply(null, keys)
    }

    getCandidates(){
        return Array.from(this.candidates.values())
    }

    /**
     * 
     * @param {number} id 
     */
    getCandidateByID(id){
        return this.candidates.get(Number(id))
    }

    /**
     * Метод возвращает данные о кандидатах в формате {ID, VALUE}, где
     * ID - ID,
     * VALUE - lastname + firstname + patronymic
     * @returns {Array} Массив объектов {ID, VALUE}
     */
    getCandidatesLikeIDValue(){
        let result = []
        this.candidates.forEach(e => {
          result.push({id:e.ID, value:e.lastname + ' ' + e.firstname + ' ' + e.patronymic})
        });
        return result
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    createCandidate(candidate){
        let newCandidate = new Candidate
        (candidate.ID, candidate.firstname, candidate.lastname, candidate.patronymic, 
            candidate.email, candidate.phone, candidate.status)
        this.candidates.set(candidate.ID, newCandidate)
        return newCandidate
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    updateCandidate(candidate){
        let updatingCandidate = this.getCandidateByID(candidate.ID)

        updatingCandidate.ID = candidate.ID
        updatingCandidate.firstname = candidate.firstname
        updatingCandidate.lastname = candidate.lastname
        updatingCandidate.patronymic = candidate.patronymic
        updatingCandidate.email = candidate.email
        updatingCandidate.phone = candidate.phone
        updatingCandidate.status = candidate.status

        this.candidates.set(updatingCandidate.ID, updatingCandidate)

        return updatingCandidate
    }

    /**
     * 
     * @param {number} candidateID 
     * @param {CANDIDATE_STATUS} status 
     */
    updateCandidateStatus(candidateID, status){
        let updatingCandidate = this.getCandidateByID(candidateID)

        updatingCandidate.status = status

        this.candidates.set(candidateID, updatingCandidate)

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