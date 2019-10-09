import Signin from "./components/signin.js";
import Signup from "./components/signup.js";
import User from "./components/user.js";
import Menu from "./components/menu.js";
import Parent from "./components/parents.js";
import ParentForm from "./components/parentForm.js";
import Student from "./components/students.js";
import StudentForm from "./components/studentForm.js";
import Schedule from "./components/schedules.js";
import ScheduleForm from "./components/scheduleForm.js";
import Station from "./components/stations.js";
import LeaveForm from "./components/leaveForm.js";

class App {
    constructor(body, footer) {
        this.body = body;
        this.signin = new Signin(body);
        this.signup = new Signup(body);
        this.user = new User(body);
        this.menu = new Menu(footer);
        this.parents = new Parent(body);
        this.ParentForm = new ParentForm(body);
        this.students = new Student(body);
        this.StudentForm = new StudentForm(body);
        this.schedules = new Schedule(body);
        this.ScheduleForm = new ScheduleForm(body);
        this.stations = new Station(body);
        this.LeaveForm = new LeaveForm(body);
    }
    init() {
        this.signin.render();
        this.addEventListener();
    }
    addEventListener() {
        this.signinEvents();
        this.signupEvents();
        this.userEvents();
        this.menuEvents();
        this.parentEvents();
        this.parentFormEvents();
        this.studentEvents();
        this.studentFormEvents();
        this.scheduleEvents();
        this.stationEvents();
        this.leaveFormEvents();
    }
    clear() {
        this.body.innerHTML = ""
    }
    signinEvents() {
        this.signin.on("error", () => alert("Authentication error"));
        this.signin.on("signin", (data) => {
            localStorage.setItem("token", `JWT ${data}`);
            // alert("You are logged in!");
            //this.parents.renderParentList();
            //this.students.render();
            this.clear();
            this.menu.render("students");
        });
        this.signin.on("signup", () => this.signup.render());
    }
    signupEvents() {
        this.signup.on("error", (err) => alert("Register error"));
        this.signup.on("signup", (user) => {
            alert(`${user.name} you were registered!`);
            this.signin.render();
        });
    }
    userEvents() {
        this.user.on("error", () => alert("User load error"));
        this.user.on("remove-error", () => alert("Cancel account error"));
        this.user.on("remove-account", () => {
            alert("So sad! You are leaving us: (");
            localStorage.clear();
            this.menu.clear();
            this.signin.render();
        });
    }
    menuEvents() {
        this.menu.on("click", (path) => {
            this.menu.render(path);
            this[path].render();
        });
        this.menu.on("logout", () => {
            localStorage.clear();
            this.menu.clear();
            this.signin.render();
        })
    }
    parentEvents() {
        this.parents.on("error", err => alert(`Parents error: \n ${err}`));
        this.parents.on("create", p => alert(`Parent created: \n ${p}`));
        this.parents.on("edit", p => this.ParentForm.render(p));
        this.parents.on("delete", p => alert(`Parent delete: \n ${p}`));
    }
    parentFormEvents() {
        this.ParentForm.on("error", () => alert("Parent error."));
        this.ParentForm.on("submit", () => {
            alert("parent submitted.")
        });
    }
    studentEvents() {
        this.students.on("error", err => alert(`Student error: \n ${err}`));
        this.students.on("create", p => alert(`Student created: \n ${p}`));
        this.students.on("edit", p => this.StudentForm.render(p));
        this.students.on("delete", p => alert(`Student delete: \n ${p}`));
        this.students.on("parent-edit", p => this.ParentForm.render(p));
    }
    studentFormEvents() {
        this.StudentForm.on("error", () => alert("Student error."));
        this.StudentForm.on("submit", () => {
            alert("Student submitted.")
        });
    }
    scheduleEvents() {
        this.schedules.on("error", err => alert(`Schedule error: \n ${err}`));
        this.schedules.on("create", s => alert(`Schedule created: \n ${s}`));
        this.schedules.on("edit", s => this.ScheduleForm.render(s));
        this.schedules.on("delete", s => alert(`Schedule delete: \n ${s}`));
    }
    stationEvents() {
        this.stations.on("error", err => alert(`Station error: \n ${err}`));
        this.stations.on("create", s => {
            this.stations.render()
        });
        // this.stations.on("edit", s => this.StationForm.render(s));
        this.stations.on("delete", s => alert(`Station delete: \n ${s}`));
    }
    leaveFormEvents() {
        this.LeaveForm.on("error", err => alert(`Leave form error: ${err}`))
        this.LeaveForm.on("submit", () => alert(`Leave form submitted.`))
    }
}

module.exports = App;