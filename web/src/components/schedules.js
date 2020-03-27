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
        this.headerClick();
        this.delete();
    }
    headerClick() {
        const rows = this.body.querySelectorAll("[sch-row]");
        [...rows].map(row => {
            row.addEventListener("click", e => {
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
                        var old = this.body.querySelector(`[style="background-color: rgb(247, 220, 111);"]`);
                        if(old != null) {
                            old.style.backgroundColor = null;
                        }
                        row.style.backgroundColor = "#F7DC6F";
                        var ttb = this.body.querySelector('[ttb-details]');
                        ttb.innerHTML = Template.renderTimeTable(data);
                        ttb.scrollIntoView();
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