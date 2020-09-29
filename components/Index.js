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

    run(tab){
        switch (tab) {
            case "employee":
                return this.employeeTab.showEmployees()
            case "event":
                return this.eventTab.showEvents()
            case "candidate":
                return this.candidateTab.showCandidates()
            default:
                return this.eventTab.showEvents();
        }  
    }
}

webix.ready( ()=>{
    let start = new Index()
    let grid = webix.ui(start.run("candidate"))

    $$("candidateButton").attachEvent("onItemClick", function(){
        if (grid){
            grid.destructor()
        }
        grid = webix.ui(start.run("candidate"))
    })

    $$("eventButton").attachEvent("onItemClick", function(){
        if (grid){
            grid.destructor()
        }
        grid = webix.ui(start.run("event"))
    })

    $$("employeeButton").attachEvent("onItemClick", function(){
        if (grid){
            grid.destructor()
        }
        grid = webix.ui(start.run("employee"))
    })

})