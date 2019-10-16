import NTask from "../ntask.js";
import Template from "../templates/leaveForm.js";
import {
    getLeave,
    getLeaveDetail,
    getStudent,
    getParent,
    getDepartTrip,
    getArriveTrip,
    getStation
} from "./leaveServices.js"
import moment from "moment";

class LeaveForm extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    async render() {
        let leave = getLeave(0),
            [depart, arrive] = getLeaveDetail(),
            [departTrips, departStations] = getDepartTrip(0),
            [arriveTrips, arriveStations] = getArriveTrip(0),
            student = getStudent(),
            parent = getParent();
        // arrive = leave.arrive;
        this.body.innerHTML = await Template.render();
        this.body.querySelector("[data-id]").value = "null"; //leave.id;
        this.body.querySelector("[data-date]").value = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
        this.body.querySelector("[data-reason]").value = leave.reason;
        this.body.querySelector("[data-remarks]").value = leave.remarks;
        // this.body.querySelector("[data-student_id]").value = student.id;
        this.body.querySelector("[data-student_full_name]").value = student.fullName;
        // this.body.querySelector("[data-parent_id]").value = parent.id;
        this.body.querySelector("[data-parent_full_name]").value = parent.fullName;
        // data-depart ขาออก
        this.body.querySelector("[data-depart]").checked = true;
        this.body.querySelector("[data-depart_shuttle_bus]").checked = true;
        this.body.querySelector("[data-depart_self_arrange]").checked = false;
        // data-depart_schedule
        let timeSelect = this.body.querySelector("[data-depart_trip_id]"); //depart.tripId;
        departTrips.map(trip => {
            let option = document.createElement("ion-select-option");
            option.value = trip.id;
            option.textContent = trip.date;
            timeSelect.appendChild(option);
        });
        timeSelect.value = depart.tripId;
        let stationSelect = this.body.querySelector("[data-depart_station_id]");
        departStations.map(station => {
            let option = document.createElement("ion-select-option");
            option.value = station.id;
            option.textContent = station.name;
            stationSelect.appendChild(option);
        });
        stationSelect.value = depart.stationId;
        // data-depart_self_arrange
        this.body.querySelector("[data-depart_date]").value = depart.date;
        this.body.querySelector("[data-depart_time]").value = depart.date;
        // data-depart_pickup
        this.body.querySelector("[data-pickup]").value = depart.pickup;
        this.body.querySelector("[data-pickup_info]").value = depart.pickupInfo;
        // data-arrive ขากลับ
        this.body.querySelector("[data-arrive]").checked = true;
        this.body.querySelector("[data-arrive_shuttle_bus]").checked = true;
        this.body.querySelector("[data-arrive_self_arrange]").checked = false;
        // data-arrive_schedule
        timeSelect = this.body.querySelector("[data-arrive_trip_id]");
        arriveTrips.map(trip => {
            let option = document.createElement("ion-select-option");
            option.value = trip.id;
            option.textContent = trip.date;
            timeSelect.appendChild(option);
        });
        timeSelect.value = arrive.tripId;
        stationSelect = this.body.querySelector("[data-arrive_station_id]");
        departStations.map(station => {
            let option = document.createElement("ion-select-option");
            option.value = station.id;
            option.textContent = station.name;
            stationSelect.appendChild(option);
        });
        stationSelect.value = arrive.stationId;
        // data-arrive_self_arrange
        this.body.querySelector("[data-arrive_date]").value = arrive.date;
        this.body.querySelector("[data-arrive_time]").value = arrive.date;
        // data-depart_pickup
        this.body.querySelector("[data-dropOff]").value = arrive.dropOff;
        this.body.querySelector("[data-dropOff_info]").value = arrive.dropOff_info;
        this.addEventListener();
        //
        this.body.querySelector("[data-depart_shuttle_bus]").click();
        this.body.querySelector("[data-arrive_shuttle_bus]").click();
    }
    addEventListener() {
        this.formSubmit();
        this.departClick();
        this.arriveClick();
    }
    formSubmit() {
        const form = this.body.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = e.target.querySelector("[data-id]");
            const name = e.target.querySelector("[data-name]");
            const surname = e.target.querySelector("[data-surname]");
            const gender = e.target.querySelector("[data-gender]");
            const phone = e.target.querySelector("[data-phone]");
            const email = e.target.querySelector("[data-email]");
            const student_id = e.target.querySelector("[data-students]");
            const opts = {
                method: "POST",
                url: `${this.URL}/payments`,
                json: true,
                headers: {
                    authorization: localStorage.getItem("token")
                },
                body: {
                    id: id.value,
                    name: name.value,
                    surname: surname.value,
                    gender: gender.value,
                    phone: phone.value,
                    email: email.value,
                    student_id: student_id.value,
                    user_id: user_id.value
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
    departClick() {
        const shuttle_bus = this.body.querySelector("[data-depart_shuttle_bus]");
        const self_arrange = this.body.querySelector("[data-depart_self_arrange]");
        const depart = this.body.querySelector("[data-depart]");
        //
        shuttle_bus.addEventListener("click", e => {
            this.body.querySelector("[data-depart_schedule]").hidden = false;
            this.body.querySelector("[data-depart_datetime]").hidden = true;
            this.body.querySelector("[data-depart_pickup]").hidden = false;
        });
        self_arrange.addEventListener("click", e => {
            this.body.querySelector("[data-depart_datetime]").hidden = false;
            this.body.querySelector("[data-depart_schedule]").hidden = true;
            this.body.querySelector("[data-depart_pickup]").hidden = false;
        });
        depart.addEventListener("click", e => {
            if (e.target.checked) {
                if (shuttle_bus.checked) {
                    shuttle_bus.click();
                };
                if (self_arrange.checked) {
                    self_arrange.click();
                }
            } else {
                this.body.querySelector("[data-depart_schedule]").hidden = !e.target.checked;
                this.body.querySelector("[data-depart_datetime]").hidden = !e.target.checked;
            }
            shuttle_bus.hidden = !e.target.checked;
            shuttle_bus.nextElementSibling.hidden = !e.target.checked;
            self_arrange.hidden = !e.target.checked;
            self_arrange.nextElementSibling.hidden = !e.target.checked;
            this.body.querySelector("[data-depart_pickup]").hidden = !e.target.checked;
        });
    }
    arriveClick() {
        const shuttle_bus = this.body.querySelector("[data-arrive_shuttle_bus]");
        const self_arrange = this.body.querySelector("[data-arrive_self_arrange]");
        const arrive = this.body.querySelector("[data-arrive]");
        //
        shuttle_bus.addEventListener("click", e => {
            this.body.querySelector("[data-arrive_schedule]").hidden = false;
            this.body.querySelector("[data-arrive_datetime]").hidden = true;
            this.body.querySelector("[data-arrive_dropOff]").hidden = false;
        });
        self_arrange.addEventListener("click", e => {
            this.body.querySelector("[data-arrive_datetime]").hidden = false;
            this.body.querySelector("[data-arrive_schedule]").hidden = true;
            this.body.querySelector("[data-arrive_dropOff]").hidden = false;
        });
        arrive.addEventListener("click", e => {
            if (e.target.checked) {
                if (shuttle_bus.checked) {
                    shuttle_bus.click();
                };
                if (self_arrange.checked) {
                    self_arrange.click();
                }
            } else {
                this.body.querySelector("[data-arrive_schedule]").hidden = !e.target.checked;
                this.body.querySelector("[data-arrive_datetime]").hidden = !e.target.checked;
            }
            shuttle_bus.hidden = !e.target.checked;
            shuttle_bus.nextElementSibling.hidden = !e.target.checked;
            self_arrange.hidden = !e.target.checked;
            self_arrange.nextElementSibling.hidden = !e.target.checked;
            this.body.querySelector("[data-arrive_dropOff]").hidden = !e.target.checked;
        });
    }
    getLeaves(parent_id) {
        return {

        }

    }
}

module.exports = LeaveForm;