import { EventTabController } from "./event/EventTabController.js";
import { EmployeeTabController } from "./employee/EmployeeTabContoller.js";
import { CandidateTabController } from "./candidate/CandidateTabController.js";

class Index{
    constructor(){
        this.eventTab = new EventTabController()

        this.employeeTab = new EmployeeTabController()

        this.candidateTab = new CandidateTabController()
    }

    init(){
        this.eventTab.init()
        this.employeeTab.init()
        this.candidateTab.init()
    }

    run(){

        let employees = this.employeeTab.config()
        let candidates = this.candidateTab.config()
        let eventsConfig = this.eventTab.config() 

        let userWindow = {
            "rows": [
                { "icon": "wxi-user", "view": "icon", "width":150 },
                {cols : [
                  { "label": "Вход", "view": "button", "width":150, "id":"loginButton", popup:"loginPopup"},
                  { "label": "Регистрация", "view":"button", "width":150, "id":"registerButton", popup:"registerPopup"}
                ]}
            ]
        }

        let tabbarHeader = {
            borderless:true, view:"tabbar", id:"tabbar", value:"listView", multiview:true, options:[
              { value:'Мероприятия', id:'events'},
              { value:'Сотрудники', id:'employees'},
              { value:'Кандидаты', id:'candidates'}
            ]
        }

        let registerPopup = {
          view:"popup",
          id:"registerPopup",
          body:{ 
            view:"form", id:"registerForm", elements:[
              {view:"text", label:"Логин", width:370, "labelWidth":150, name:"login", placeholder:"Логин", align:"left", required:true},
              {view:"text", label:"Пароль", type:"password", "labelWidth":150, name:"password", placeholder:"Пароль", align:"left", required:true},
              {view:"text", label:"Повторите пароль", "labelWidth":150, type:"password", name:"repeatPassword", placeholder:"Повторите пароль", align:"left", required:true},
              {view:"button", label:"Зарегистрироваться", click:register}
            ]
          }
        }

        let loginPopup =  {
          view:"popup",
          id:"loginPopup",
          body:{ 
            view:"form", id:"loginForm", width:200, elements:[
              {view:"text", label:"Логин", name:"login", placeholder:"Логин", align:"center", required:true},
              {view:"text", label:"Пароль", type:"password", name:"password", placeholder:"Пароль", align:"center", required:true},
              {view:"button", label:"Войти", click:login}
            ]
          }
        }

        let tabbar = {
            rows:[
              {
                id:"main",
                type:"clean",
                rows:[
                    {cols: [
                        tabbarHeader,
                        userWindow,
                    ]},
                  {
                    cells:[
                     eventsConfig,
                     employees,
                     candidates
                    ]
                  }
                ]
              }
            ]
        }

        webix.ui(tabbar)

        webix.ui(loginPopup)
        webix.ui(registerPopup)

        this.init()
    }
}

webix.ready( ()=>{
    let start = new Index()
    start.run()

})

function login(){
  const values = $$("loginForm").getValues()
  alert(values.login + " " + values.password)
}

function register(){
  const values = $$("registerForm").getValues()
  if (values.password != values.repeatPassword) {
    alert("Пароли не совпадают")
  }
  else{
    alert("Всё ок")
  }
}