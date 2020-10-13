export class CCreateCandidateWindow{
    constructor(){

    }

    init(candidateModel, refreshDatatable){

        this.candidateModel = candidateModel
        this.refreshDatatable = refreshDatatable

        this.window = $$("createWindow")
        this.main = $$("main")
        this.form = $$("createForm")

        this.attachCandidateOnCreateWindow()
    }

    attachCandidateOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", () =>{
            this.window.close()
            this.main.enable()
        })

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            if (!this.form.validate()){
                webix.message("Email имеет неверный формат!")
                this.form.clear()
                return
            }
            let values = this.fetch()
            if (this.isEmptyString(values.firstname, values.lastname, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            this.candidateModel.createCandidate(values).then(()=>{
                this.refreshDatatable()
                this.window.close()
                this.main.enable()
            })
        })

        this.window.show()
        this.main.disable()
    }


    /**
     * Метод возвращает данные с формы
     * @param {string} formName имя формы
     * @returns данные с формы
     */
    fetch(){
        return this.form.getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {string} formName имя формы
     * @param {*} values значения
     */
    parse(values){
        this.form.setValues(values)
    }

    /**
     * Метод для проверки пустых строк
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
}