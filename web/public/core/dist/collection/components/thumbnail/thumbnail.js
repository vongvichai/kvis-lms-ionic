export class Thumbnail {
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-thumbnail"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return "/**style-placeholder:ion-thumbnail:**/"; }
}
