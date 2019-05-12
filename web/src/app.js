import Signin from "./components/signin.js";
import Signup from "./components/signup.js";
import User from "./components/user.js";
import Menu from "./components/menu.js";
//
// import Slips from "./components/slips.js";


class App {
    constructor(body, footer) {
        this.signin = new Signin(body);
        this.signup = new Signup(body);
        this.user = new User(body);
        // this.slips = new Slips(body);
        this.menu = new Menu(footer);
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
        // this.slipsEvents();
    }
    signinEvents() {
        this.signin.on("error", () => alert("Authentication error"));
        this.signin.on("signin", (data) => {
            localStorage.setItem("token", `JWT ${data.token}`);
            const iconHtml = '<ion-icon slot="icon-only" name="contact"></ion-icon>',
                contactButton = document.querySelector('[data-contact]'),
                logoutButton = document.querySelector('[data-logout]');
            contactButton.innerHTML = iconHtml + data.name + ' ' + data.fullname;
            contactButton.style.visibility = 'visible';
            logoutButton.style.visibility = 'visible';
            logoutButton.addEventListener('click', (e) => {
                localStorage.clear();
                this.menu.clear();
                this.signin.render();
                logoutButton.style.visibility = 'hidden';
                contactButton.style.visibility = 'hidden';
            });
            //alert("You are logged in!" + data.fullname);
            this.menu.render("footer");
            // this.slips.render(data.name);
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
        // slipsEvents() {
        //     this.slips.on("error", () => alert("Slip list error"));
        //     this.slips.on("remove-error", () => alert("Slip delete error"));
        //     this.slips.on("update-error", () => alert("Slip update error"));
        //     this.slips.on("remove", () => this.slips.render());
        //     this.slips.on("detail", (data) => this.slips.renderDetail(data));
        // }
    userEvents() {
        this.user.on("error", () => alert("User load error"));
        this.user.on("remove-error", () => alert("Cancel account error"));
        this.user.on("remove-account", () => {
            alert("So sad! You are leaving us: (");
            localStorage.clear();
            this.menu.clear()
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
}

module.exports = App;