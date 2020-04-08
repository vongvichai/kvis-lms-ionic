import NTask from "../ntask.js";
import Template from "../templates/schedules.js";
import moment from "moment-timezone";

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
        this.add();
        this.ref();
        this.edit();
        this.delete();
        this.save();
        this.close();
    }
    headerClick() {
        const btns = this.body.querySelectorAll("[btn-sch-details]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                var old = this.body.querySelector(`[style="background-color: rgb(247, 220, 111);"]`);
                if(old != null) {
                    old.style.backgroundColor = null;
                }
                const row = this.body.querySelectorAll(`ion-row[data-id='${id}']`)
                row[0].style.backgroundColor = "#F7DC6F";
                this.emit("click", id);
            });
        })
    }
    add() {
        const btn = this.body.querySelector("[btn-sch-add]");
        btn.addEventListener("click", e => {
            e.preventDefault();
            const fromDate = this.body.querySelector("[data-fromdate]");
            const toDate = this.body.querySelector("[data-todate]");
            const opts = {
                method: "POST",
                url: `${this.URL}/schedules`,
                json: true,
                headers: {
                    authorization: localStorage.getItem("token")
                },
                body: {
                    fromDate: fromDate.value,
                    toDate: toDate.value
                }
            };
            this.request(opts, (err, res, data) => {
                if (err) {
                    this.emit("error", err);
                } else {
                    this.emit("create", data);
                    this.render();
                }
            })
        })
    }
    ref() {
        const btn = this.body.querySelector("[btn-sch-add-ref]");
        const form = this.body.querySelector("[form-add-sch]");
        btn.addEventListener("click", e => {
            e.preventDefault();
            form.querySelector(`[data-fromdate]`).value = "";
            form.querySelector(`[data-todate]`).value = "";
        })
    }
    edit() {
        const btns = this.body.querySelectorAll("[btn-sch-edit]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const inputs = this.body.querySelectorAll(`ion-input[data-id='${id}']`);
                inputs.forEach(e => {
                    e.readonly = false;
                })
                const buttons = this.body.querySelectorAll(`ion-button[data-id='${id}']`);
                buttons[0].style.display = "none";
                buttons[1].style.display = "none";
                buttons[2].style.display = "none";
                buttons[3].style.display = "";
                buttons[4].style.display = "";
            });
        })
    }
    delete() {
        const btns = this.body.querySelectorAll("[btn-sch-delete]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                if(confirm("Are you sure you want to delete?")){
                    const opts = {
                        method: "DELETE",
                        url: `${this.URL}/schedules/${id}`,
                        json: true,
                        headers: {
                            authorization: localStorage.getItem("token")
                        },
                        body: {}
                    };
                    this.request(opts, (err, res, data) => {
                        if (err) {
                            this.emit("error", err);
                        } else {
                            this.emit("delete", data);
                            this.render();
                        }
                    })
                }
            });
        })
    }
    save() {
        const forms = this.body.querySelectorAll("form");
        [...forms].map(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const inputs = this.body.querySelectorAll(`ion-input[data-id='${id}']`);
                const fromDate = moment.tz(`${inputs[0].value}`, 'Asia/Bangkok');
                const toDate = moment.tz(`${inputs[1].value}`, 'Asia/Bangkok');
                const opts = {
                    method: "PUT",
                    url: `${this.URL}/schedules/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: { fromDate, toDate }
                };
                this.request(opts, (err, resp, data) => {
                    if (err || resp.status === 412) {
                        this.emit("error", err);
                    } else {
                        this.emit("save", data);
                        inputs.forEach(e => {
                            e.readonly = true;
                        })
                        const buttons = this.body.querySelectorAll(`ion-button[data-id='${id}']`);
                        buttons[0].style.display = "";
                        buttons[1].style.display = "";
                        buttons[2].style.display = "";
                        buttons[3].style.display = "none";
                        buttons[4].style.display = "none";
                        inputs[0].setAttribute("initial-val", `${fromDate.format().slice(0, 10)}`);
                        inputs[1].setAttribute("initial-val", `${toDate.format().slice(0, 10)}`);
                    }
                });
            });
        })
    }
    close() {
        const btns = this.body.querySelectorAll("[btn-sch-close]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const inputs = this.body.querySelectorAll(`ion-input[data-id='${id}']`);
                const fromDate = inputs[0];
                const toDate = inputs[1];
                inputs.forEach(e => {
                    e.readonly = true;
                })
                const buttons = this.body.querySelectorAll(`ion-button[data-id='${id}']`);
                buttons[0].style.display = "";
                buttons[1].style.display = "";
                buttons[2].style.display = "";
                buttons[3].style.display = "none";
                buttons[4].style.display = "none";
                fromDate.value = fromDate.getAttribute("initial-val");
                toDate.value = toDate.getAttribute("initial-val");
            });
        })
    }
}
module.exports = Schedule;