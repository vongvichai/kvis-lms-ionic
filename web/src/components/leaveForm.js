import NTask from "../ntask.js";
import Template from "../templates/leaveForm.js";
import { getLeave, getDepartTrip } from "./leaveServices.js"
import moment from "moment";

class LeaveForm extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    async render() {
        let leave = getLeave(0),
            departTrip = getDepartTrip(0);

        let student = leave.student,
            parent = leave.parent,
            depart = leave.depart,
            arrive = leave.arrive;
        this.body.innerHTML = await Template.render();
        this.body.querySelector("[data-id]").value = "null"; //leave.id;
        this.body.querySelector("[data-date]").value = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
        this.body.querySelector("[data-reason]").value = leave.reason;
        this.body.querySelector("[data-remarks]").value = leave.remarks;
        // this.body.querySelector("[data-student_id]").value = student.id;
        this.body.querySelector("[data-student_full_name]").value = student.fullName;
        // this.body.querySelector("[data-parent_id]").value = parent.id;
        this.body.querySelector("[data-parent_full_name]").value = parent.fullName;
        this.body.querySelector("[data-shuttle_bus]").checked = true;
        this.body.querySelector("[data-depart_trip_id]").value = "1"; //depart.tripId;
        this.body.querySelector("[data-depart_station_id]").value = "2"; //depart.stationId;
        this.body.querySelector("[data-depart_by]").value = "1"; //depart.by;
        this.body.querySelector("[data-depart_info]").value = depart.info;
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
        const oneself = this.body.querySelector("[data-oneself]");
        const depart_record = this.body.querySelector("[data-depart_record]");
        //
        shuttle_bus.addEventListener("click", e => {
            this.body.querySelector("[data-depart_shuttle_bus]").hidden = false;
            this.body.querySelector("[data-depart_oneself]").hidden = true;
            this.body.querySelector("[data_depart_pickup]").hidden = false;
        });
        oneself.addEventListener("click", e => {
            this.body.querySelector("[data-depart_oneself]").hidden = false;
            this.body.querySelector("[data-depart_shuttle_bus]").hidden = true;
            this.body.querySelector("[data_depart_pickup]").hidden = false;
        });
        depart_record.addEventListener("click", e => {
            if (e.target.checked) {
                if (shuttle_bus.checked) {
                    shuttle_bus.click();
                };
                if (oneself.checked) {
                    oneself.click();
                }
            } else {
                this.body.querySelector("[data-depart_shuttle_bus]").hidden = !e.target.checked;
                this.body.querySelector("[data-depart_oneself]").hidden = !e.target.checked;
            }
            shuttle_bus.hidden = !e.target.checked;
            shuttle_bus.nextElementSibling.hidden = !e.target.checked;
            oneself.hidden = !e.target.checked;
            oneself.nextElementSibling.hidden = !e.target.checked;
            this.body.querySelector("[data_depart_pickup]").hidden = !e.target.checked;
        })
    }
    getLeaves(parent_id) {
        return {

        }

    }
}

module.exports = LeaveForm;