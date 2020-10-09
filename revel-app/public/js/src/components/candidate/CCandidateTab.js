import { CCandidateWindow } from "./CCandidateWindow.js";
import { CandidateTabView } from "./CandidateTabView.js";

export class CCandidateTab{
    constructor(){
        this.candidateWindowController = new CCandidateWindow()
        this.candidateTabView = new CandidateTabView()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.candidateWindowController.init()
        this.attachEvent()

        this.candidateWindowController.refreshDatatable()
    }

    /**
     * Метод для отображения главного окна кандидатов
     * @returns конфигурация WEBIX
     */
    config(){
        return this.candidateTabView.view()
    }

    /**
     * Метод для привязки событий
     */
    attachEvent(){
        $$("candidatecmenu").attachTo($$("candidates"));

        this.attachEventWindowHandler(this)
    }

    /**
     * Метод для привязки событий к контекстному меню кандидатов
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        $$("candidatecmenu").attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let candidate = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){   
                controller.candidateWindowController.createWindow()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.candidateWindowController.deleteWindow(candidate)
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.candidateWindowController.updateWindow(candidate)          
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.candidateWindowController.aboutWindow(candidate)
            }           
          });
    }
}