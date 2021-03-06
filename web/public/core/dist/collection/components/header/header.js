export class Header {
    constructor() {
        this.translucent = false;
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                [`header-${this.mode}`]: true,
                [`header-translucent`]: this.translucent,
                [`header-translucent-${this.mode}`]: this.translucent,
            }
        };
    }
    static get is() { return "ion-header"; }
    static get properties() { return {
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-header:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-header:**/"; }
}
