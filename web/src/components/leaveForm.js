import NTask from "../ntask.js";
import Template from "../templates/leaveForm.js";
import {
    getLeave,
    getLeaveDetail,
    getStudent,
    getParent,
    getDepartTrip,
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
        this.body.querySelector("[data-shuttle_bus]").checked = true;
        this.body.querySelector("[data-self_arrange]").checked = false;
        // data-depart_schedule
        let timeSelect = this.body.querySelector("[data-depart_trip_id]"); //depart.tripId;
        departTrips.map(trip => {
            let option = document.createElement("ion-select-option");
            option.value = trip.id;
            option.textContent = trip.date;
            timeSelect.appendChild(option);
        });
        timeSelect.value = depart.tripId;
        let stationSelect = this.body.querySelector("[data-depart_station_id]"); //depart.stationId;
        departStations.map(station => {
            let option = document.createElement("ion-select-option");
            option.value = station.id;
            option.textContent = station.name;
            stationSelect.appendChild(option);
        });
        stationSelect.value = depart.stationId;
        // data-self_arrange
        this.body.querySelector("[data-depart_date]").value = depart.date;
        this.body.querySelector("[data-depart_time]").value = depart.date;
        // data-depart_pickup
        this.body.querySelector("[data-pickup]").value = depart.pickup;
        this.body.querySelector("[data-pickup_info]").value = depart.pickupInfo;
        //
        this.body.querySelector("[data-arrive_trip_id]").value = arrive.tripId;
        this.body.querySelector("[data-arrive_vehicle_id]").value = arrive.vehicleId;
        this.body.querySelector("[data-arrive_station_id]").value = arrive.stationId;
        this.body.querySelector("[data-arrive_by]").value = arrive.by;
        this.body.querySelector("[data-arrive_info]").value = arrive.info;
        this.addEventListener();
        //
        this.body.querySelector("[data-shuttle_bus]").click();
    }
    addEventListener() {
        this.formSubmit();
        this.departClick();
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
        const shuttle_bus = this.body.querySelector("[data-shuttle_bus]");
        const self_arrange = this.body.querySelector("[data-self_arrange]");
        const depart = this.body.querySelector("[data-depart]");
        //
        shuttle_bus.addEventListener("click", e => {
            this.body.querySelector("[data-depart_schedule]").hidden = false;
            this.body.querySelector("[data-depart_self_arrange]").hidden = true;
            this.body.querySelector("[data-depart_pickup]").hidden = false;
        });
        self_arrange.addEventListener("click", e => {
            this.body.querySelector("[data-depart_self_arrange]").hidden = false;
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
                this.body.querySelector("[data-depart_self_arrange]").hidden = !e.target.checked;
            }
            shuttle_bus.hidden = !e.target.checked;
            shuttle_bus.nextElementSibling.hidden = !e.target.checked;
            self_arrange.hidden = !e.target.checked;
            self_arrange.nextElementSibling.hidden = !e.target.checked;
            this.body.querySelector("[data-depart_pickup]").hidden = !e.target.checked;
        })
    }
    getLeaves(parent_id) {
        return {

        }

    }
}

module.exports = LeaveForm;