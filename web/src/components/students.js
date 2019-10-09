import NTask from "../ntask.js";
import Template from "../templates/students.js";

class Student extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    render() {
        this.renderStudentList();
    }
    renderStudentList() {
        const opts = {
            method: "GET",
            url: `${this.URL}/students`,
            json: true,
            headers: {
                authorization: localStorage.getItem("token")
            }
        };
        this.request(opts, (err, res, data) => {
            if (err) {
                this.emit("error", err);
            } else {
                this.body.innerHTML = Template.render(data);
                this.addEventListener();
            }
        });
    }
    addEventListener() {
        this.edit();
        this.delete();
        this.parentEdit();
    }
    edit() {
        const btns = this.body.querySelectorAll("[btn-edit]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const opts = {
                    method: "GET",
                    url: `${this.URL}/students/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                };
                this.request(opts, (err, res, data) => {
                    if (err) {
                        this.emit("error", err);
                    } else {
                        this.emit("edit", data);
                    }
                })
            });
        })
    }
    delete() {
        const btns = this.body.querySelectorAll("[btn-delete]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const opts = {
                    method: "DELETE",
                    url: `${this.URL}/students/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                };
                this.request(opts, (err, res, data) => {
                    if (err) {
                        this.emit("error", err);
                    } else {
                        this.emit("delete", data);
                    }
                })
            });
        })
    }
    parentEdit() {
        const btns = this.body.querySelectorAll('[btn-parent-edit]');
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const opts = {
                    method: "GET",
                    url: `${this.URL}/parents/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                };
                this.request(opts, (err, res, data) => {
                    if (err) {
                        this.emit("error", err);
                    } else {
                        this.emit("parent-edit", data);
                    }
                })
            })
        })
    }
}
module.exports = Student;