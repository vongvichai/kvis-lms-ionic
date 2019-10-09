import NTask from "../ntask.js";
import Template from "../templates/parents.js";

class Parent extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    render() {
        this.renderParentList();
    }
    renderParentList() {
        const opts = {
            method: "GET",
            url: `${this.URL}/parents`,
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
        this.edit();
        this.delete();
        this.virtualScroll();
    }
    edit() {
        const btns = this.body.querySelectorAll("[btn-edit]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const opts = {
                    method: "GET",
                    url: `${this.URL}/parents/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                };
                this.request(opts, (err, res, data) => {
                    if (err) {
                        this.emit("error", err);
                    } else {
                        console.log(data)
                        this.emit("edit", data);
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
                    url: `${this.URL}/parents/${id}`,
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

    // virtualScroll() {
    //     let content = document.querySelector('ion-content');
    //     content.scrollEvents = true;
    //     content.addEventListener('ionScrollStart', () => console.log('scroll start'));
    //     content.addEventListener('ionScroll', (ev) => console.log('scroll', ev.detail));
    //     content.addEventListener('ionScrollEnd', () => console.log('scroll end'));
    // }
}
module.exports = Parent;