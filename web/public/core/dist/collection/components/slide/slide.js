export class Slide {
    componentDidLoad() {
        this.ionSlideChanged.emit();
    }
    componentDidUnload() {
        this.ionSlideChanged.emit();
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
                'swiper-slide': true,
                'swiper-zoom-container': true
            }
        };
    }
    static get is() { return "ion-slide"; }
    static get events() { return [{
            "name": "ionSlideChanged",
            "method": "ionSlideChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-slide:**/"; }
}
