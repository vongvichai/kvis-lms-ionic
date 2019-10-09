import NTask from "../ntask.js";
import Template from "../templates/schedules.js";

class Schedule extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    render() {
        this.renderScheduleList();
    }
    renderScheduleList() {
        const opts = {
            method: "GET",
            url: `${this.URL}/schedules`,
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
    }
    edit() {
        const btns = this.body.querySelectorAll("[btn-edit]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const opts = {
                    method: "GET",
                    url: `${this.URL}/schedules/${id}`,
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
                    url: `${this.URL}/schedules/${id}`,
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
}
module.exports = Schedule;