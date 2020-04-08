import request from "browser-request";
import moment from 'moment-timezone';
import Schedule from './schedules.js';
import Template from '../templates/schedules.js'

class TimeTable extends Schedule {
    constructor(body) {
        super();
        this.body = body;
    }
    renderTimeTable(id) {
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
                this.div = this.body.querySelector('[ttb-details]');
                this.div.setAttribute("sch-id", id)
                this.div.innerHTML = Template.renderTimeTable(data);
                const stations = this.div.querySelectorAll("[data-station]");
                stations.forEach((s, i) => {
                    var sta = [];
                    data.TimeTables[i].Stations.map(d => {
                        sta.push(`${d.id}`);
                    })
                    s.value = sta;
                    s.setAttribute("initial-val", JSON.stringify(sta));
                })
                this.div.scrollIntoView();
                this.addEventListener();
            }
        })
    }
    addEventListener() {
        this.add();
        this.edit();
        this.delete();
        this.save();
        this.close();
        this.ref();
    }

    add() {
        const btn = this.body.querySelector("[btn-ttb-add]");
        btn.addEventListener("click", e => {
            e.preventDefault();
            const form = this.div.querySelector("[form-add-ttb]");
            const date = form.querySelector(`[data-add-date]`);
            const time = form.querySelector(`[data-add-time]`);
            const trip = form.querySelector('[data-add-trip]');
            const station = form.querySelector('[data-add-station]');
            const dateVal = moment.tz(`${date.value} ${time.value}`, 'Asia/Bangkok');
            const opts = {
                method: "POST",
                url: `${this.URL}/timetables`,
                json: true,
                headers: {
                    authorization: localStorage.getItem("token")
                },
                body: {
                    tripType: trip.value,
                    datetime: dateVal,
                    ScheduleId: this.div.getAttribute("sch-id"),
                    stations: station.value
                }
            };
            this.request(opts, (err, res, data) => {
                if (err) {
                    this.emit("error", err);
                } else {
                    this.emit("create", data);
                    this.renderTimeTable(this.div.getAttribute("sch-id"));
                }
            })
        })
    }

    ref() {
        const btn = this.div.querySelector("[btn-ttb-add-ref]");
        const form = this.div.querySelector("[form-add-ttb]");
        btn.addEventListener("click", e => {
            e.preventDefault();
            form.querySelector(`[data-add-date]`).value = "";
            form.querySelector(`[data-add-time]`).value = "";
            form.querySelector('[data-add-trip]').value = "";
            form.querySelector('[data-add-station]').value = "";
        })
    }

    edit() {
        const btns = this.div.querySelectorAll("[btn-ttb-edit]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("id");
                const row = this.div.querySelectorAll(`ion-row[id='${id}']`)[0];
                const date = row.querySelector(`[data-date]`);
                const time = row.querySelector(`[data-time]`);
                const trip = row.querySelector('[data-trip]');
                const station = row.querySelector('[data-station]');
                date.readonly = false;
                time.readonly = false;
                trip.disabled = false;
                station.disabled = false;
                const buttons = row.querySelectorAll(`ion-button`);
                buttons[0].style.display = "none";
                buttons[1].style.display = "none";
                buttons[2].style.display = "";
                buttons[3].style.display = "";
            });
        })
    }

    delete() {
        const btns = this.body.querySelectorAll("[btn-ttb-delete]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("ttb-id");
                const row = this.body.querySelectorAll(`ion-row[id='${e.target.getAttribute("id")}']`)[0];
                const stationId = row.querySelector("[data-station]").value;
                if(confirm("Are you sure you want to delete?")){
                    const opts = {
                        method: "DELETE",
                        url: `${this.URL}/timetables/${id}`,
                        json: true,
                        headers: {
                            authorization: localStorage.getItem("token")
                        },
                        body: { stationId }
                    };
                    request(opts, (err, res, data) => {
                        if (err) {
                            this.emit("error", err);
                        } else {
                            this.emit("delete", data);
                            this.renderTimeTable(this.div.getAttribute("sch-id"));
                        }
                    })
                }
            });
        })
    }

    save() {
        const forms = this.div.querySelectorAll("form");
        [...forms].map(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const id = e.target.getAttribute("ttb-id");
                const date = form.querySelector(`[data-date]`);
                const time = form.querySelector(`[data-time]`);
                const trip = form.querySelector('[data-trip]');
                const station = form.querySelector('[data-station]');
                const dateVal = moment.tz(`${date.value} ${time.value}`, 'Asia/Bangkok');
                const opts = {
                    method: "PUT",
                    url: `${this.URL}/timetables/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: {
                        tripType: trip.value,
                        datetime: dateVal,
                        stations: station.value
                    }
                };
                request(opts, (err, resp, data) => {
                    if (err || resp.status === 412) {
                        this.emit("error", err);
                    } else {
                        this.emit("save", data);
                        date.readonly = true;
                        time.readonly = true;
                        trip.disabled = true;
                        station.disabled = true;
                        const buttons = form.querySelectorAll(`ion-button`);
                        buttons[0].style.display = "";
                        buttons[1].style.display = "";
                        buttons[2].style.display = "none";
                        buttons[3].style.display = "none";
                        date.setAttribute("initial-val", `${dateVal.format().slice(0, 10)}`);
                        time.setAttribute("initial-val", `${dateVal.format().slice(11, 16)}`);
                        trip.setAttribute("initial-val", `${trip.value}`);
                        station.setAttribute("initial-val", JSON.stringify(station.value));
                    }
                });
            });
        })
    }

    close() {
        const btns = this.div.querySelectorAll("[btn-ttb-close]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("id");
                const row = this.div.querySelectorAll(`ion-row[id='${id}']`)[0];
                const date = row.querySelector(`[data-date]`);
                const time = row.querySelector(`[data-time]`);
                const trip = row.querySelector('[data-trip]');
                const station = row.querySelector('[data-station]');
                date.readonly = true;
                time.readonly = true;
                trip.disabled = true;
                station.disabled = true;
                const buttons = row.querySelectorAll(`ion-button`);
                buttons[0].style.display = "";
                buttons[1].style.display = "";
                buttons[2].style.display = "none";
                buttons[3].style.display = "none";
                date.value = date.getAttribute("initial-val");
                time.value = time.getAttribute("initial-val");
                trip.value = trip.getAttribute("initial-val");
                station.value = JSON.parse(station.getAttribute("initial-val"));
            });
        })
    }
}
module.exports = TimeTable;