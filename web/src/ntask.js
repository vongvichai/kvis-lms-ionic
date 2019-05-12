import TinyEmitter from "tiny-emitter";
import request from "browser-request";

class NTask extends TinyEmitter {
    constructor() {
        super();
        this.request = request;
        this.URL = window.location.origin; //"http://localhost:3000";
    }
}

module.exports = NTask;