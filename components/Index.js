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
                { "label": "Login", "view": "button", "width":150, "id":"loginButton"}
            ]
        }

        let tabbarHeader = {
            borderless:true, view:"tabbar", id:"tabbar", value:"listView", multiview:true, options:[
              { value:'Events', id:'events'},
              { value:'Employees', id:'employees'},
              { value:'Candidates', id:'candidates'}
            ]
          }

        let tabbar = {
            rows:[
              {
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

        webix.ui(tabbar)
    }
}

webix.ready( ()=>{
    let start = new Index()
    start.run()
    
    $$("loginButton").attachEvent("onItemClick", function(){
      webix.ui({
        view:"window",
        head:"My Window",
        body:{
            template:"Some text"
        }
    });
    })

    // $$("candidate").attachEvent("onItemClick", function(id){
    //     let element = $$("candidate").getItem(id)
    //     alert(element)
    // })

    // $$("candidateButton").attachEvent("onItemClick", function(){
    //     alert("CANDIDATE")
    //     // if (grid){
    //     //     grid.destructor()
    //     // }
    //     // grid = webix.ui(start.run("candidate"))
    // })

    // $$("eventButton").attachEvent("onItemClick", function(){
    //     alert("EVENT")
    //     // if (grid){
    //     //     grid.destructor()
    //     // }
    //     // grid = webix.ui(start.run("event"))
    // })

    // $$("employeeButton").attachEvent("onItemClick", function(id){
    //     //let element = $$("candidate").getItem(id)
    //     alert("EMPLOYEE")
    //     // if (grid){
    //     //     grid.destructor()
    //     // }
    //     // grid = webix.ui(start.run("employee"))
    // })

})