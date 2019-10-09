import NTask from "../ntask.js";
import Template from "../templates/stations.js";

class Station extends NTask {
    constructor(body) {
        super();
        this.body = body;
    }
    render() {
        this.renderStationList();
    }
    renderStationList() {
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
            } else {
                this.body.innerHTML = Template.render(data);
                this.addEventListener();
            }
        });
    }
    addEventListener() {
        this.add();
        this.edit();
        this.delete();
    }
    add() {
        const btns = this.body.querySelectorAll("[btn-add]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-new");
                const name = document.querySelector(`[data-name-new]`);
                const opts = {
                    method: "POST",
                    url: `${this.URL}/stations`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: {
                        name: name.value
                    }
                };
                this.request(opts, (err, res, data) => {
                    if (err) {
                        this.emit("error", err);
                    } else {
                        this.emit("create", data);
                    }
                })
            });
        })
    }
    edit() {
        const btns = this.body.querySelectorAll("[btn-save]");
        [...btns].map(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                const name = document.querySelector(`[data-name-${id}]`);
                const opts = {
                    method: "PUT",
                    url: `${this.URL}/stations/${id}`,
                    json: true,
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: {
                        name: name.value
                    }
                };
                this.request(opts, (err, res, data) => {
                    if (err) {
                        this.emit("error", err);
                    } else {
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
                if (confirm("Do you really wanna delete this station?")) {
                    const id = e.target.getAttribute("data-id");
                    const opts = {
                        method: "DELETE",
                        url: `${this.URL}/stations/${id}`,
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
                };
            })
        })
    }
}
module.exports = Station;