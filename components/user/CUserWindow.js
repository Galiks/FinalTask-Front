import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindow } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userWindow = new UserWindow()
        this.userModel = new UserModel()
        this.currentUser = new User();
    }

    init(){
        this.loginWindow()
        this.registerWindow()
    }

    attachEvent(){

    }

    loginWindow(){
        webix.ui(this.userWindow.loginView())

        $$("loginPopupButton").attachEvent("onItemClick", ()=>{
            let values = this.fetch("loginForm")

            if(values.login == "admin" && values.password == "admin"){
                this.currentUser = new User(0, "admin", "admin", null, new Date())
                $$("loginButton").disable()
                $$("registerButton").disable()
                $$("userIcon").enable()
                this.aboutWindow()
                return
            }
            else{
                this.userModel.getUserByLoginAndPassword(values.login, values.password).then((user)=>{
                    if (user != null) {
                        this.currentUser = user
                        $$("loginButton").disable()
                        $$("registerButton").disable()

                        this.aboutWindow()
                    }
                })
            }
            
        })
    }

    registerWindow(){
        webix.ui(this.userWindow.registerView())

        $$("registerPopupButton").attachEvent("onItemClick", ()=>{
            const values = $$("registerForm").getValues()
            if (values.password != values.repeatPassword) {
                alert("Пароли не совпадают")
            }
            else{
                alert("Всё ок")
            }
        })
    }

    aboutWindow(){
        webix.ui(this.userWindow.aboutUserView(this.currentUser))

        $$("userIcon").define("popup", "userPopup")
        $$("userIcon").refresh()

        $$("logoutButton").attachEvent("onItemClick", ()=>{
            this.currentUser = null
            $$("userIcon").disable()
            $$("loginButton").enable()
            $$("registerButton").enable()
        })
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