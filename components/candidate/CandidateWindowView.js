import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateWindowView{
    constructor(){

    }

    /**
     * 
     * @param {Candidate} cadidate 
     */
    view(candidate){
        return {
            "id": 1601304390441,
            "rows": [
                {
                    "height": 183,
                    "cols": [
                        { "view": "template", "template": "Place for image", "role": "placeholder", "width": 215 },
                    ]
                },
                {
                    "height": 0,
                    "data":candidate,
                    "cols": [
                        {
                            "rows": [
                                { "id":"firstname", "label": "Имя", "view": "text", "height": 0 },
                                { "id":"lastname", "label": "Фамилия", "view": "text", "height": 0 },
                                { "id":"patronymic", "label": "Отчество", "view": "text", "height": 0 },
                                { "id":"email", "label": "Email", "view": "text", "height": 0 },
                                { "id":"phone", "label": "Телефон", "view": "text", "height": 0 }
                            ],
                            "width": 215
                        }
                    ]
                }
            ]
        }
    }
}