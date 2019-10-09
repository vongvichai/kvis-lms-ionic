import NTask from "../ntask.js";
import Template from "../templates/studentForm.js";

class StudentForm extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    async render(student) {
        student = student || {
            id: null,
            name: null,
            surname: null,
            gender: null,
            phone: null,
            email: null,
            Parents: null
        }
        this.body.innerHTML = await Template.render();
        this.body.querySelector("[data-id]").value = student.id;
        this.body.querySelector("[data-name]").value = student.name;
        this.body.querySelector("[data-surname]").value = student.surname;
        this.body.querySelector("[data-gender]").value = student.gender;
        this.body.querySelector("[data-phone]").value = student.phone;
        this.body.querySelector("[data-email]").value = student.email;
        let parentList = student.Parents.map(p => {
            return `${p.fullName} ${p.phone}`;
        });
        this.body.querySelector("[data-parents]").value = parentList.join(',');
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
            const opts = {
                method: "POST",
                url: `${this.URL}/students`,
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
                    email: email.value
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

module.exports = StudentForm;