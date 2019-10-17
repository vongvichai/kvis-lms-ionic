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

        this.body.innerHTML = await Template.render();
        let idSelect = this.body.querySelector("[data-id]");
        let opt = document.createElement("ion-select-option");
        opt.value = opt.textContent = idSelect.value = leave.id;;
        idSelect.appendChild(opt);
        this.body.querySelector("[data-date]").value = moment(new Date()).format("YYYY-MM-DD HH:MM");
        this.body.querySelector("[data-reason]").value = leave.reason;
        this.body.querySelector("[data-remarks]").value = leave.remarks;
        this.body.querySelector("[data-student_id]").value = student.id;
        this.body.querySelector("[data-student_id]").textContent = student.fullName;
        this.body.querySelector("[data-parent_id]").value = parent.id;
        this.body.querySelector("[data-parent_id]").textContent = parent.fullName;
        this.body.querySelector("[data-cancelled]").checked = leave.cancelled;
        ////////////////////////////////////////////
        // data-depart ขาออก //////////////////////
        this.body.querySelector("[data-depart]").checked = !(depart == undefined);
        this.body.querySelector("[data-depart_shuttle_bus]").checked = true;
        this.body.querySelector("[data-depart_self_arrange]").checked = false;
        // data-depart_schedule
        let timeSelect = this.body.querySelector("[data-depart_time_table_id]");
        departTrips.map(trip => {
            let option = document.createElement("ion-select-option");
            option.value = trip.id;
            option.textContent = trip.date;
            timeSelect.appendChild(option);
        });
        timeSelect.value = depart.timeTableId;
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
        this.body.querySelector("[data-pickup]").value = depart.contact;
        this.body.querySelector("[data-pickup_info]").value = depart.contactInfo;
        ///////////////////////////////////////////
        // data-arrive ขากลับ /////////////////////
        this.body.querySelector("[data-arrive]").checked = !(arrive == undefined);
        this.body.querySelector("[data-arrive_shuttle_bus]").checked = false;
        this.body.querySelector("[data-arrive_self_arrange]").checked = true;
        // data-arrive_schedule
        timeSelect = this.body.querySelector("[data-arrive_time_table_id]");
        arriveTrips.map(trip => {
            let option = document.createElement("ion-select-option");
            option.value = trip.id;
            option.textContent = trip.date;
            timeSelect.appendChild(option);
        });
        timeSelect.value = arrive.timeTableId;
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
        this.body.querySelector("[data-dropOff]").value = arrive.contact;
        this.body.querySelector("[data-dropOff_info]").value = arrive.contactInfo;
        this.addEventListener();
        //
        this.body.querySelector("[data-depart_schedule]").hidden = (depart.date == null);
        this.body.querySelector("[data-arrive_schedule]").hidden = (arrive.date == null);
        this.body.querySelector("[data-cancelled_row]").hidden = (leave.id == null);
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
            const date = e.target.querySelector("[data-date]");
            const reason = e.target.querySelector("[data-reason]");
            const remarks = e.target.querySelector("[data-remarks]");
            const student_id = e.target.querySelector("[data-student_id]");
            const parent_id = e.target.querySelector("[data-parent_id]");
            const cancel = e.target.querySelector("[data-cancelled]");
            //
            const depart_time_table_id = this.body.querySelector("[data-depart_time_table_id]");
            const depart_station_id = this.body.querySelector("[data-depart_station_id]");
            const depart_date = this.body.querySelector("[data-depart_date]");
            const depart_pickup = this.body.querySelector("[data-pickup]");
            const depart_pickup_info = this.body.querySelector("[data-pickup_info]");
            //
            const arrive_time_table_id = this.body.querySelector("[data-arrive_time_table_id]");
            const arrive_station_id = this.body.querySelector("[data-arrive_station_id]");
            const arrive_date = this.body.querySelector("[data-arrive_date]");
            const arrive_dropOff = this.body.querySelector("[data-dropOff]");
            const arrive_dropOff_info = this.body.querySelector("[data-dropOff_info]");

            const opts = {
                method: "POST",
                url: `${this.URL}/leaves`,
                json: true,
                headers: {
                    authorization: localStorage.getItem("token")
                },
                body: {
                    id: id.value,
                    date: moment(date.value),
                    type: 'Weekend/Holiday',
                    reason: reason.value,
                    remarks: remarks.value,
                    studentId: student_id.value,
                    parentId: parent_id.value,
                    cancelled: cancel.value,

                    details: [{
                            type: 'DEPART',
                            timeTableId: depart_time_table_id.value,
                            stationId: depart_station_id.value,
                            date: moment(depart_date.value),
                            contact: depart_pickup.value,
                            contactInfo: depart_pickup_info.value
                        },
                        {
                            type: 'ARRIVE',
                            timeTableId: arrive_time_table_id.value,
                            stationId: arrive_station_id.value,
                            date: moment(arrive_date.value),
                            contact: arrive_dropOff.value,
                            contactInfo: arrive_dropOff_info.value
                        }
                    ]
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
}

module.exports = LeaveForm;