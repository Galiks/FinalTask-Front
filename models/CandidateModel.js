import { CANDIDATE_STATUS } from '../components/candidate/CandidateTabController.js'
import {Candidate} from './entities/Candidate.js'

export class CandidateModel{
    constructor(){
        this.candidates = new Map()

        this.candidates.set(Number(1), new Candidate(1, "ivan", "ivanov", "ivanovich", "email@email.com", "888888", CANDIDATE_STATUS.invite))
        this.candidates.set(Number(2), new Candidate(2, "ivan2", "ivanov2", "ivanovich2", "222email@email.com", "22888888", CANDIDATE_STATUS.showUp))

        this.candidateEvent = [
            {   
                employeeID: 0,
                eventID: 0
            }
        ]
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

    getCandidatesByEvent(id){
        alert("DID NOTHING")
    }

    /**
     * 
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate 
     */
    createCandidate(candidate){
        let id = this.candidates.size + 1
        let newCandidate = new Candidate
        (id, candidate.firstname, candidate.lastname, candidate.patronymic, 
            candidate.email, candidate.phone, candidate.status)
        this.candidates.set(id, newCandidate)
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
     * @param {number} id 
     */
    deleteCandidate(id){
        this.candidates.delete(id)
    }
}