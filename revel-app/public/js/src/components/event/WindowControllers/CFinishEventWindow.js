import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";

export class CFinishEventWindow{
    constructor(){
        
    }

    init(eventModel, candidateModel, refreshDatatable, updateCandidateStatus){
        this.eventModel = eventModel,
        this.candidateModel = candidateModel
        this.refreshDatatable - refreshDatatable
        this.updateCandidateStatus = updateCandidateStatus

        this.finishWindow = $$("finishWindow")
        this.mainTab = $$("main")
    }

    /**
     * Метод для привязки событий к окну завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {Candidate[]} candidates массив объекто класса Candidate
     */
    attachEventOnFinishWindow(event, candidates){

        $$("finishWindowButton").attachEvent("onItemClick", ()=>{
            this.finishEvent(event, candidates);
        });

        this.finishWindow.attachEvent("onDestruct", () => {
            this.refreshDatatable("events");
        });

        this.finishWindow.attachEvent("onHide", ()=> {
            this.finishWindow.close()
            this.mainTab.enable()
        })

        $$("finishWindowClose").attachEvent("onItemClick", ()=>{
            this.finishWindow.close()
            this.mainTab.enable()
        });


        this.finishWindow.show();
        this.mainTab.disable();
    }

    /**
     * Метод для завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {Candidate[]} candidates массив объектов класса Candidate
     */
    finishEvent(event, candidates) {
        let flagOnCandidateStatus = true;
        if ($$("finishWindowButton").isEnabled()) {
            if (event.status == EVENT_STATUS.finished) {

                candidates.every(element => {
                    if (element.status != CANDIDATE_STATUS.wait && element.status != CANDIDATE_STATUS.dontShowUp) {
                        $$("finishWindowButton").disable();
                        flagOnCandidateStatus = false;
                        return false;
                    }
                });
                
                //Если кандидат не "явился", то "не успешно"
                if (flagOnCandidateStatus) {
                    event.status = EVENT_STATUS.archive;
                    this.eventModel.updateEvent(event).then(() => {
                        this.refreshDatatable("events");
                        this.updateCandidateStatus(event.ID, CANDIDATE_STATUS.empty)
                        this.finishWindow.close()
                        this.mainTab.enable()
                    });
                }
                else {
                    webix.message("Условие не выполнилось: кандидаты не завершили мероприятие");
                }
            }
            else {
                $$("finishWindowButton").disable();
            }
        }
    }
}