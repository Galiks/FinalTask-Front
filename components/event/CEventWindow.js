import { EventWindowView } from "./EventWindowView.js";
import { Event } from "./../../models/entities/Event.js";
import { EventModel } from "../../models/EventModel.js";
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CANDIDATE_STATUS } from "../candidate/CCandidateTab.js";

export class EventWindowController{
    constructor(){
        
    }

    /**
     * Метод для инициализации
     * @param {EventModel} eventModel объект класса EventModel
     */
    init(eventModel){
        this.eventModel = eventModel
        //this.eventModel = new EventModel()
        this.eventWindowView = new EventWindowView()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()
        this.refreshEventDatatable
    }

    /**
     * Метод обновляет данные в указанной таблице
     * @param {string} datatableName имя таблицы
     */
    refreshDatatable(datatableName){
        let getData;
        if (datatableName == "events") {
            getData = this.eventModel.getEvents()
        }
        else if(datatableName == "candidates"){
            getData = this.candidateModel.getCandidates()
        }
        else if (datatableName == "employees"){
            getData = this.employeeModel.getEmloyees()
        }
        else {
            return
        }
        getData.then((data)=>{
            $$(datatableName).clearAll()
            $$(datatableName).parse(data)
            $$(datatableName).refresh()
        })
    }

    /**
     * Метод для проверки строк на пустоту
     * @returns true/false
     */
    isEmptyString(){
        for (let index = 0; index < arguments.length; index++) {
            const element = arguments[index];
            if (element.trim() == ''){
                return true
            }
        }
        return false
    }

    /**
     * Метод закрывает указанное окно и разблокирует главное окно
     * @param {string} window ID окна
     */
    closeWindow(window) {
        $$(window).close();
        $$("main").enable();
    }

    /**
     * Метод для закрытия окна при его сокрытии
     * @param {string} window название окна
     */
    attachEventEventOnHideWindow(window){
        $$(window).attachEvent("onHide", ()=> {
            this.closeWindow(window)
        })
    }

    /**
     * Метод вызывает окно для создания мероприятия
     */
    createWindow(){
        webix.ui(this.eventWindowView.viewCreateWindow())     

        this.setMultiselectOptions();

        this.attachEventOnCreateWindow()
        $$("createWindow").show()
        $$("main").disable()
    }

    /**
     * Метод устанавливает значения для свойства options
     */
    setMultiselectOptions() {
        this.employeeModel.getEmployeesLikeIDValue().then((result) => {
            $$("employeesMultiselect").define("options", result);
            $$("employeesMultiselect").refresh();
        });
        this.candidateModel.getCandidatesLikeIDValue().then((result) => {
            $$("candidatesMultiselect").define("options", result);
            $$("candidatesMultiselect").refresh();
        });
    }

    /**
     * Метод устанавливает значения для свойства value
     * @param {number} eventID номер мероприятия
     */
    setMultiselectValue(eventID) {
        let employeesMultiselectValue = this.eventModel.getEmployeeIDByEventIDLikeString(eventID);
        employeesMultiselectValue.then((value) => {
            $$("employeesMultiselect").setValue(value);
        });
        let candidatesMultiselectValue = this.eventModel.getCandidateIDByEventIDLikeString(eventID);
        candidatesMultiselectValue.then((value) => {
            $$("candidatesMultiselect").setValue(value);
        });
    }
    
    /**
     * Метод вызывает окно для обновления данных мероприятия
     * @param {Event} event объект класса Event
     */
    updateWindow(event){
        webix.ui(this.eventWindowView.viewUpdateWindow(event))

        this.setMultiselectValue(event.ID);

        this.setMultiselectOptions()

        this.attachEventOnUpdateWindow(event)

        $$("updateWindow").show()
        $$("main").disable()
    }

    /**
     * Метод вызывает окно для удаления мероприятия
     * @param {Event} event объект класса Event
     */
    deleteWindow(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))

        $$("deleteWindow").attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        this.attachEventOnDeleteWindow(event)

        $$("deleteWindow").show()
        $$("main").disable()
    }

    /**
     * Метод вызывает окно с информацией о мероприятии
     * @param {Event} event объект класса Event
     */
    aboutWindow(event){
        let employees = []
        let candidates = []
        Promise.all([
            this.eventModel.getEmployeeIDByEventID(event.ID).then((IDs)=>{
                IDs.forEach((id)=>{
                    this.employeeModel.getEmployeeByID(id).then((employee)=>{
                        employees.push(employee)
                    })
                })
            }),

            this.eventModel.getCandidateIDByEventID(event.ID).then((IDs)=>{
                IDs.forEach((id)=>{
                    this.candidateModel.getCandidateByID(id).then((candidate)=>{
                        candidates.push(candidate)
                    })
                })
            })
        ]).then(()=>{
            $$("employeesAbout").parse(employees)
            $$("candidatesAbout").parse(candidates)
    
            $$("aboutWindow").show()
            $$("main").disable()
        })
        

        webix.ui(this.eventWindowView.viewAboutWindow(event, employees, candidates))

        $$("aboutWindow").attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        this.attachEventOnAboutWindow()
    }

    /**
     * Метод вызывает окно для завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {number[]} candidates массив из ID кандидатов 
     */
    finishWindow(event){
        let candidates = []
        this.eventModel.getCandidateIDByEventID(event.ID).then((IDs) =>{
            IDs.forEach((id)=>{
                this.candidateModel.getCandidateByID(id).then((candidate)=>{
                    candidates.push(candidate)
                })
            })
        }).then(()=>{
            webix.ui(this.eventWindowView.viewFinishWindow(event, candidates))
            $$("finishWindow").attachEvent("onDestruct", ()=>{
                this.refreshDatatable("events")})

            this.attachEventOnFinishWindow(event, candidates)

            $$("finishWindow").show()
            $$("main").disable()
        })
    }

    /**
     * Метод для привязки событий к окну создания мероприятия
     */
    attachEventOnCreateWindow(){

        this.attachEventEventOnHideWindow("createWindow")

        $$("createWindow").attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("createWindow")
        })

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            let values = this.fetch("createForm")
            if (this.isEmptyString(values.theme, values.beginning, values.status)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            this.eventModel.createEvent(values).then((newEvent)=>{
                console.log(newEvent)
                employees.split(',').forEach(elem => {
                    this.eventModel.setEmployeeToEvent(elem, newEvent.ID).then(()=>{

                    })
                });
                candidates.split(',').forEach(elem => {
                    this.eventModel.setCandidateToEvent(elem, newEvent.ID).then(()=>{
                        
                    })
                });

                this.refreshDatatable("events")
            })
            this.closeWindow("createWindow");
        })
    }

    /**
     * Метод для привязки событий к окну обновления мероприятия
     * @param {Event} event объект класса Event
     */
    attachEventOnUpdateWindow(event){

        this.attachEventEventOnHideWindow("updateWindow")

        $$("updateWindow").attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("updateWindow")     
        });

        this.parse("updateForm", event)

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            let values = this.fetch("updateForm")
            if (this.isEmptyString(values.theme, values.beginning, values.status)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            this.eventModel.updateEvent(values).then((updatingEvent) =>{
                if (updatingEvent.status == EVENT_STATUS.planned) {
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.invite);
                }
                else if (updatingEvent.status == EVENT_STATUS.finished) {
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.wait)
                }
            })

            this.eventModel.updateCandidateEvent(candidates, event.ID).then(()=>{
                this.refreshDatatable("events");
            })
            this.eventModel.updateEmployeeEvent(employees, event.ID).then(()=>{
                this.refreshDatatable("events");
            })

            this.closeWindow("updateWindow");
            this.refreshDatatable("events");
        })
    }

    /**
     * Метод обновляет статус кандидата
     * @param {CANDIDATE_STATUS} status статус кандидата
     */
    updateCandidateStatus(eventID, status) {
        let candidateIDsEvent = this.eventModel.getCandidateIDByEventID(eventID);
        candidateIDsEvent.then((IDs) => {
            IDs.forEach(candidateID => {
                this.candidateModel.updateCandidateStatus(candidateID, status).then(() => {
                    this.refreshDatatable("candidates")
                });
            });
        });
    }

    /**
     * Метод для привязки событий к окну удаления мероприятия
     * @param {Event} event объект класса Event
     */
    attachEventOnDeleteWindow(event){

        this.attachEventEventOnHideWindow("deleteWindow")

        $$("deleteWindowClose").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")  
        })

        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.closeWindow("deleteWindow")
        })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.eventModel.deleteEvent(event.ID).then(()=>{
                this.closeWindow("deleteWindow")
                this.refreshDatatable("events")
            })
        })
    }

    /**
     * Метод для привязки событий к окну информации о мероприятии
     */
    attachEventOnAboutWindow(){

        this.attachEventEventOnHideWindow("aboutWindow")

        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("aboutWindow")
        });
    }

    /**
     * Метод для привязки событий к окну завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {Candidate[]} candidates массив объекто класса Candidate
     */
    attachEventOnFinishWindow(event, candidates){

        this.attachEventEventOnHideWindow("finishWindow")

        $$("finishWindowClose").attachEvent("onItemClick", ()=>{
            this.closeWindow("finishWindow")
        });

        $$("finishWindowButton").attachEvent("onItemClick", ()=>{
            this.finishEvent(event, candidates);
        });
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
                        this.refreshDatatable("candidates");
                    });
                    this.closeWindow("finishWindow");
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

    /**
     * Метод возвращает данные с формы
     * @param {string} formName имя формы
     * @returns данные с формы
     */
    fetch(formName){
        return $$(formName).getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {string} formName имя формы
     * @param {*} values значения
     */
    parse(formName, values){
        $$(formName).setValues(values)
    }
}

/**
 * Константа для хранения состояний мероприятия
 */
export const EVENT_STATUS = {
    planned: "Запланировано",
    inProgress: "В процессе",
    finished: "Закончено",
    archive: "Архив"
}

// import { EventWindowView } from "./EventWindowView.js";
// import { EventModel } from "../../models/EventModel.js";
// import { Event } from "../../models/entities/Event.js";
// import { EVENT_STATUS } from "./CEventTab.js";
// import { CANDIDATE_STATUS } from "../candidate/CCandidateTab.js";

// export class EventWindowController{
//     constructor(){
//         // this.eventModel = new EventModel()
//         this.eventWindowView = new EventWindowView()
//     }

//     init(eventModel){
//         this.eventModel = eventModel
//     }

    // isEmptyString(){
    //     for (let index = 0; index < arguments.length; index++) {
    //         const element = arguments[index];
    //         if (element.trim() == ''){
    //             return true
    //         }
    //     }
    //     return false
    // }

    // /**
    //  * Метод закрывает указанное окно и разблокирует главное окно
    //  * @param {string} window ID окна
    //  */
    // closeWindow(window) {
    //     $$(window).close();
    //     $$("main").enable();
    // }
//     /**
//      * 
//      * @param {Event[]} events массив объектов класса Event 
//      */
//     refreshEventDatatable(events){
//         if (events){
//             $$("events").parse(events)
//             $$("events").refresh()
//         }else{
//             this.eventModel.getEvents((events) => {
//                 if (events.length == 0) {
//                     eventsData.push(new Employee())
//                     $$("eventcmenu").clearAll()
//                     $$("eventcmenu").define("data", ["Добавить"])
//                     $$("eventcmenu").refresh()
//                 } else {
//                     $$("events").clearAll()
//                     $$("events").parse(events)
//                     $$("events").refresh()
//                 }
//             })
//         }
//     }

    // attachEventOnCreateWindow(){
    //     $$("createWindowClose").attachEvent("onItemClick", ()=>{
    //         this.closeWindow("createWindow")
    //     })

    //     this.attachEventEventOnHideWindow("createWindow")

    //     $$("createWindowButton").attachEvent("onItemClick", ()=>{
    //         let values = $$("createForm").getValues()
    //         if (this.isEmptyString(values.theme, values.beginning, values.status)) {
    //             webix.message("Один из параметров оказался пустым!")
    //             return
    //         }
    //         let employees = $$("employeesMultiselect").getValue()
    //         let candidates = $$("candidatesMultiselect").getValue()
    //         let id
    //         this.eventModel.getLastID().then((lastId) => {
    //             id = lastId + 1
    //         })
    //         this.eventModel.createEvent(
    //             new Event(id, values.theme, values.beginning, values.status));

    //         employees.split(',').forEach(element => {
    //             this.eventModel.setEmployeeToEvent(element, id)
    //         });

    //         candidates.split(',').forEach(element=>{
    //             this.eventModel.setCandidateToEvent(element, id)
    //         });
            
    //         this.refreshDatatable("events")
    //         this.closeWindow("createWindow");
    //     })
    // }

//     attachEventOnUpdateWindow(event){
        // $$("updateWindowClose").attachEvent("onItemClick", ()=>{
        //     this.closeWindow("updateWindow")     
        //   });

        // this.attachEventEventOnHideWindow("updateWindow")

        // $$("updateForm").setValues({
        //     ID: event.ID,
        //     theme: event.theme,
        //     beginning: event.beginning,
        //     status: event.status
        // })

        // $$("updateWindowButton").attachEvent("onItemClick", ()=>{
        //     let values = $$("updateForm").getValues()
        //     if (this.isEmptyString(values.theme, values.beginning, values.status)) {
        //         webix.message("Один из параметров оказался пустым!")
        //         return
        //     }
        //     let employees = $$("employeesMultiselect").getValue()
        //     let candidates = $$("candidatesMultiselect").getValue()
        //     this.eventModel.updateEvent(new Event(event.ID, values.theme, values.beginning, values.status))

        //     this.eventModel.updateCandidateEvent(candidates, event.ID)
        //     this.eventModel.updateEmployeeEvent(employees, event.ID)

        //     this.closeWindow("updateWindow");
        //     this.refreshDatatable("events");
        // })

//     }

    // attachEventOnDeleteWindow(event){
    //     $$("deleteWindowClose").attachEvent("onItemClick", () =>{
    //         this.closeWindow("deleteWindow")  
    //       })

    //     this.attachEventEventOnHideWindow("deleteWindow")

    //     $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
    //         this.eventModel.deleteEvent(event.ID)

    //         this.closeWindow("deleteWindow")
    //         this.refreshDatatable("events")
    //     })
    //     $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
    //         this.closeWindow("deleteWindow")
    //     })
    // }

    // attachEventOnAboutWindow(){
    //     $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
    //         this.closeWindow("aboutWindow")
    //     });

    //     this.attachEventEventOnHideWindow("aboutWindow")
    // }

    // attachEventOnFinishWindow(event, candidates){
    //     $$("finishWindowClose").attachEvent("onItemClick", ()=>{
    //         this.closeWindow("finishWindow")
    //     });

    //     $$("finishWindowButton").attachEvent("onItemClick", ()=>{

    //         //вынести в логику из привязки события
    //         let flagOnCandidateStatus = true
    //         if ($$("finishWindowButton").isEnabled()) {
    //             if(event.status == EVENT_STATUS.finished){
    //                 candidates.every(element => {
    //                 if(element.status != CANDIDATE_STATUS.wait || element.status != CANDIDATE_STATUS.dontShowUp){
    //                     $$("finishWindowButton").disable()
    //                     flagOnCandidateStatus = false
    //                     return false;
    //                 }
    //             });
    //                 //Если кандидат не "явился", то "не успешно"
    //                 if(flagOnCandidateStatus){
    //                     this.eventModel.updateEvent(new Event(event.ID, event.theme, event.beginning, EVENT_STATUS.archive))
    //                     this.refreshDatatable("events")
    //                     this.closeWindow("finishWindow")
    //                 }
    //                 else{
    //                     webix.message("Условие не выполнилось: кандидаты не завершили мероприятие")
    //                 }
    //             }
    //             else{
    //                 $$("finishWindowButton").disable()
    //             }
    //         }
    //         else{
    //             $$("finishhint").start()
    //         }
    //     });


//         this.attachEventEventOnHideWindow("finishWindow")

//     }

//     createEvent(employees, candidates){
//         webix.ui(this.eventWindowView.viewCreateWindow(employees, candidates))
//         this.attachEventOnCreateWindow()
//     }

//     deleteEvent(event){
//         webix.ui(this.eventWindowView.viewDeleteWindow(event))
//         this.attachEventOnDeleteWindow(event)
//     }

//     updateEvent(event, employees, candidates){
//         let employeesMultiselectValue = this.eventModel.getEmployeeIDByEventIDLikeString(event.ID)
//         let candidatesMultiselectValue = this.eventModel.getCandidateIDByEventIDLikeString(event.ID)
//         webix.ui(this.eventWindowView.viewUpdateWindow(employees, candidates, employeesMultiselectValue, candidatesMultiselectValue))
//         this.attachEventOnUpdateWindow(event)
//     }

//     aboutEvent(event, employees, candidates){
//         webix.ui(this.eventWindowView.viewAboutWindow(event, employees, candidates))
//         this.attachEventOnAboutWindow()
//     }

//     finishEvent(event, candidates){
//         webix.ui(this.eventWindowView.viewFinishWindow(event, candidates))
//         this.attachEventOnFinishWindow(event, candidates)
//     }
// }