import NTask from "../ntask.js";
import Template from "../templates/parentForm.js";

class ParentForm extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    async render(parent) {
        parent = parent || {
            id: null,
            name: null,
            surname: null,
            gender: null,
            phone: null,
            email: null,
            Students: null,
            UserId: null
        }
        this.body.innerHTML = await Template.render();
        this.body.querySelector("[data-id]").value = parent.id;
        this.body.querySelector("[data-name]").value = parent.name;
        this.body.querySelector("[data-surname]").value = parent.surname;
        this.body.querySelector("[data-gender]").value = parent.gender;
        this.body.querySelector("[data-phone]").value = parent.phone;
        this.body.querySelector("[data-email]").value = parent.email;
        let studentList = parent.Students.map(s => {
            return `${s.code} ${s.fullName}`;
        });
        this.body.querySelector("[data-students]").value = studentList.join(',')
        this.addEventListener();

    }
    addEventListener() {
        this.formSubmit();
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
}

module.exports = ParentForm;