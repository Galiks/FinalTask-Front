
export class CAboutEventWindow{
    constructor(){

    }

    init(event, eventModel, employeeModel, candidateModel){
        this.eventModel = eventModel
        this.employeeModel = employeeModel
        this.candidateModel = candidateModel

        this.aboutWindow = $$("aboutWindow")
        this.mainTab = $$("main")

        this.attachEventOnAboutWindow(event)
    }

    /**
     * Метод возвращает объект из массива сотрудников и массива кандидатов
     * @param {Event} event объект класса Event
     * @returns {Employee[],Candidate[]} объект из массива сотрудников и массива кандидатов
     */
    setEmployeesAndCandidatesToEvent(event) {
        let employees = [];
        let candidates = [];
        Promise.all([
            this.eventModel.getEmployeeIDByEventID(event.ID).then((IDs) => {
                IDs.forEach((id) => {
                    this.employeeModel.getEmployeeByID(id).then((employee) => {
                        employees.push(employee);
                    });
                });
            }),

            this.eventModel.getCandidateIDByEventID(event.ID).then((IDs) => {
                IDs.forEach((id) => {
                    this.candidateModel.getCandidateByID(id).then((candidate) => {
                        candidates.push(candidate);
                    });
                });
            })
        ]).then(() => {
            $$("employeesAbout").parse(employees);
            $$("candidatesAbout").parse(candidates);

            $$("aboutWindow").show();
            $$("main").disable();
        });
    }

    /**
     * Метод для привязки событий к окну информации о мероприятии
     */
    attachEventOnAboutWindow(event){

        this.aboutWindow.attachEvent("onHide", ()=> {
            this.aboutWindow.close()
            this.mainTab.enable()
        })

        $$("aboutWindow").attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.aboutWindow.close()
            this.mainTab.enable()
        });

        this.setEmployeesAndCandidatesToEvent(event)
    }
}