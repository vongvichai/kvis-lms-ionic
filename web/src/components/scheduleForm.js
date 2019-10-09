import NTask from "../ntask.js";
import Template from "../templates/scheduleForm.js";

class ScheduleForm extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    render(schedule) {
        schedule = schedule || {
            id: null,
            expired: null,
            trip_type: null,
            timeTables: null
        }
        this.getStations()
            .then(data => schedule.Stations = data)
            .then(() => {
                this.body.innerHTML = Template.render(schedule);
                this.body.querySelector("[data-id]").value = schedule.id;
                this.body.querySelector("[data-expired]").checked = schedule.expired ? true : false;
                // this.body.querySelector("[data-timeTables]").value = schedule.TimeTables;
                // this.body.querySelector("[data-stations]").value = schedule.Stations;
                this.addEventListener();
            })
    }
    addEventListener() {
        this.formSubmit();
    }
    formSubmit() {
        const form = this.body.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = e.target.querySelector("[data-id]");
            const expired = e.target.querySelector("[data-expired]");
            const timeTables = e.target.querySelector("[data-timeTables]");
            const stations = e.target.querySelector("[data-stations]");
            const opts = {
                method: "POST",
                url: `${this.URL}/schedules`,
                json: true,
                headers: {
                    authorization: localStorage.getItem("token")
                },
                body: {
                    id: id.value,
                    expired: expired.value,
                    timeTables: timeTables.value,
                    stations: stations.value
                }
            };
            this.request(opts, (err, resp, data) => {
                if (err || resp.status === 412) {
                    this.emit("error", err);
                } else {
                    this.emit("submit");
                }
            });
        });
    }
    getStations() {
        return new Promise((resolve, rejects) => {
            const opts = {
                method: "GET",
                url: `${this.URL}/stations`,
                json: true,
                headers: {
                    authorization: localStorage.getItem("token")
                }
            };
            this.request(opts, (err, res, data) => {
                if (err) {
                    this.emit("error", err);
                    rejects(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}

module.exports = ScheduleForm;