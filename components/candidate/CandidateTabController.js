import { CandidateWindowController } from "./CandidateWindowController.js";
import { CandidateModel } from "./../../models/CandidateModel.js";
import { CandidateTabView } from "./CandidateTabView.js";

export class CandidateTabController{
    constructor(){
        this.candidateWindowController = new CandidateWindowController()
        this.candidateModel = new CandidateModel()
        this.candidateTabView = new CandidateTabView()
    }

    init(){
        this.candidateWindowController.init()
        this.attachEvents()
        this.attachEventWindowHandler(this)
    }

     config(){
        return this.candidateTabView.view(this.candidateModel.getCandidates())
    }

    attachEvents(){
        $$("candidatecmenu").attachTo($$("candidates"));
    }

    /**
     * 
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        $$("candidatecmenu").attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            let constructorName = element.constructor.name
            if (this.getItem(id).value == "Добавить"){   
                controller.candidateWindowController.createCandidate()
                $$("createWindow").show()
                $$("main").disable()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.candidateWindowController.deleteCandidate(element)
              $$("deleteWindow").show()
              $$("main").disable()
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.candidateWindowController.updateCandidate(element)          
              $$("updateWindow").show()
              $$("main").disable()
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.candidateWindowController.aboutCandidate(element)
              $$("aboutWindow").show()
              $$("main").disable()
            }           
          });
    }
}

export const CANDIDATE_STATUS = {
    invite: "Приглашен",
    showUp: "Явился",
    dontShowUp: "Не явился",
    wait: "Ожидает результат",
    success: "Успешно",
    unsuccess: "Неуспешно"
}