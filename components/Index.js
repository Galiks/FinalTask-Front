import { EventTabController } from "./event/EventTabController.js";
import { EmployeeTabController } from "./employee/EmployeeTabContoller.js";
import { CandidateTabController } from "./candidate/CandidateTabController.js";

class Index{
    constructor(){
        this.eventTab = new EventTabController()

        this.employeeTab = new EmployeeTabController()

        this.candidateTab = new CandidateTabController()
        
        this.init()
    }

    init(){
        this.eventTab.init()

        this.employeeTab.init()

        this.candidateTab.init()
    }

    run(){

        let employees = this.employeeTab.showEmployees()
        let candidates = this.candidateTab.showCandidates()
        let events = this.eventTab.showEvents()

        let userWindow = {
            "rows": [
                { "icon": "wxi-user", "view": "icon", "width":150 },
                { "label": "Login", "view": "button", "width":150, "id":"loginButton", popup:"loginPopup"}
            ]
        }

        let tabbarHeader = {
            borderless:true, view:"tabbar", id:"tabbar", value:"listView", multiview:true, options:[
              { value:'Мероприятия', id:'events'},
              { value:'Сотрудники', id:'employees'},
              { value:'Кандидаты', id:'candidates'}
            ]
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

        var contextmenu = {
          view:"contextmenu",
          id:"cmenu",
          data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"],
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
                     events,
                     employees,
                     candidates
                    ]
                  }
                ]
              }
            ]
        }

        let createWindow = {
          view:"window",
          height:250,
          width:300,
          head:"Окно содания",
          position:"center",
          body:{
            "autoheight": false,
            "view": "form",
            "rows": [
              { "view": "text", "label": "User name", "name": "name" },
              { "view": "text", "label": "Email", "name": "email" },
              { "view": "button", "css": "webix_primary", "label": "Создать", "id":"createWindowButton" }
            ]
          },
          close: true,
          id: "createWindow"
        }

        let deleteWindow = {
          view:"window",
          height:250,
          width:300,
          head:"Окно удаления",
          position:"center",
          body:{
            "rows": [
              {
                "template": "Вы уверены, что хотите удалить данных элемент?",
                "view": "template"
              },
              {
                "cols": [
                  { "label": "Да", "view": "button", id:"deleteWindowButtonYes" },
                  { "label": "Нет", "view": "button", id:"deleteWindowButtonNo" }
                ]
              }
            ]
          },
          close: true,
          id: "deleteWindow"
        }

        let updateWindow = {
          view:"window",
          height:250,
          width:300,
          head:"Окно изменения",
          position:"center",
          body:{
            "autoheight": false,
            "view": "form",
            "rows": [
              { "view": "text", "label": "User name", "name": "name" },
              { "view": "text", "label": "Email", "name": "email" },
              { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton" }
            ]
          },
          close: true,
          id: "updateWindow"
        }

        let aboutWindow = {
          view:"window",
          height:250,
          width:300,
          head:"Окно информации",
          position:"center",
          body:{
            "elements": [
              { "label": "Информация", "type": "label" },
              { "label": "Width", "type": "text", "id": "width", "value": 250 },
              { "label": "Height", "type": "text", "id": "height", "value": 250 }
            ],
            "view": "property"
          },
          close: true,
          id: "aboutWindow"
        }

        webix.ui(tabbar)
        webix.ui(loginPopup)
        webix.ui(contextmenu)
        webix.ui(createWindow)
        webix.ui(deleteWindow)
        webix.ui(updateWindow)
        webix.ui(aboutWindow)
    }
}

webix.ready( ()=>{
    let start = new Index()
    start.run()

    $$("cmenu").attachEvent("onItemClick", function(id){
      let context = this.getContext();
      let item = context.obj;
      let itemID = context.id;
      let element = item.getItem(itemID)
      let constructorName = element.constructor.name
      if (this.getItem(id).value == "Добавить"){         
        $$("createWindow").show()
        $$("main").disable()
      }
      else if (this.getItem(id).value == "Удалить"){
        $$("deleteWindow").show()
        $$("main").disable()
      }
      else if (this.getItem(id).value == "Изменить"){          
        $$("updateWindow").show()
        $$("main").disable()
      }
      else if (this.getItem(id).value == "Подробнее"){
        $$("aboutWindow").show()
        $$("main").disable()
      }
      console.log(this.getItem(id).value)             
    });

    $$("cmenu").attachTo($$("events"));
    $$("cmenu").attachTo($$("employees"));
    $$("cmenu").attachTo($$("candidates"));

    $$("createWindow").attachEvent("onHide", function(){
      $$("main").enable()
    })

    $$("deleteWindow").attachEvent("onHide", function(){
      $$("main").enable()
    })

    $$("updateWindow").attachEvent("onHide", function(){
      $$("main").enable()
    })

    $$("aboutWindow").attachEvent("onHide", function(){
      $$("main").enable()
    })
})

function login(){
  const values = $$("loginForm").getValues()
  alert(values.login + " " + values.password)
}