import { h } from '../ionic.core.js';

import { c as present, d as dismiss, e as eventMethod, b as isCancel, f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-265f51bc.js';
import { c as createColorClasses, a as getClassMap } from './chunk-2f96b3d2.js';

function iosEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', top);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', bottom);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', top, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', bottom, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(8px + var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(8px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperEl.style.top = top;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperEl.style.bottom = bottom;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

class Toast {
    constructor() {
        this.presented = false;
        this.duration = 0;
        this.keyboardClose = false;
        this.position = 'bottom';
        this.showCloseButton = false;
        this.translucent = false;
        this.animated = true;
    }
    async present() {
        await present(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(undefined, 'timeout'), this.duration);
        }
    }
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    onDidDismiss() {
        return eventMethod(this.el, 'ionToastDidDismiss');
    }
    onWillDismiss() {
        return eventMethod(this.el, 'ionToastWillDismiss');
    }
    getButtons() {
        const buttons = this.buttons
            ? this.buttons.map(b => {
                return (typeof b === 'string')
                    ? { text: b }
                    : b;
            })
            : [];
        if (this.showCloseButton) {
            buttons.push({
                text: this.closeButtonText || 'Close',
                handler: () => this.dismiss(undefined, 'cancel')
            });
        }
        return buttons;
    }
    async buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            return this.dismiss(undefined, role);
        }
        const shouldDismiss = await this.callButtonHandler(button);
        if (shouldDismiss) {
            return this.dismiss(undefined, button.role);
        }
        return Promise.resolve();
    }
    async callButtonHandler(button) {
        if (button && button.handler) {
            try {
                const rtn = await button.handler();
                if (rtn === false) {
                    return false;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return true;
    }
    hostData() {
        return {
            style: {
                zIndex: 60000 + this.overlayIndex,
            },
            class: Object.assign({ [`${this.mode}`]: true }, createColorClasses(this.color), getClassMap(this.cssClass), { 'toast-translucent': this.translucent })
        };
    }
    renderButtons(buttons, side) {
        if (buttons.length === 0) {
            return;
        }
        const buttonGroupsClasses = {
            'toast-button-group': true,
            [`toast-button-group-${side}`]: true
        };
        return (h("div", { class: buttonGroupsClasses }, buttons.map(b => h("button", { type: "button", class: buttonClass(b), tabIndex: 0, onClick: () => this.buttonClick(b) },
            h("div", { class: "toast-button-inner" },
                b.icon &&
                    h("ion-icon", { name: b.icon, slot: b.text === undefined ? 'icon-only' : undefined, class: "toast-icon" }),
                b.text),
            this.mode === 'md' && h("ion-ripple-effect", { type: b.icon !== undefined && b.text === undefined ? 'unbounded' : 'bounded' })))));
    }
    render() {
        const allButtons = this.getButtons();
        const startButtons = allButtons.filter(b => b.side === 'start');
        const endButtons = allButtons.filter(b => b.side !== 'start');
        const wrapperClass = {
            'toast-wrapper': true,
            [`toast-${this.position}`]: true
        };
        return (h("div", { class: wrapperClass },
            h("div", { class: "toast-container" },
                this.renderButtons(startButtons, 'start'),
                h("div", { class: "toast-content" },
                    this.header !== undefined &&
                        h("div", { class: "toast-header" }, this.header),
                    this.message !== undefined &&
                        h("div", { class: "toast-message" }, this.message)),
                this.renderButtons(endButtons, 'end'))));
    }
    static get is() { return "ion-toast"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "closeButtonText": {
            "type": String,
            "attr": "close-button-text"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayIndex": {
            "type": Number,
            "attr": "overlay-index"
        },
        "position": {
            "type": String,
            "attr": "position"
        },
        "present": {
            "method": true
        },
        "showCloseButton": {
            "type": Boolean,
            "attr": "show-close-button"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionToastDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1000;pointer-events:none}:host([dir=rtl])+b{right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}:host-context([dir=rtl]) .toast-wrapper{left:var(--end);right:var(--start)}.toast-container{-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-container,.toast-content{display:-ms-flexbox;display:flex}.toast-content{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media (any-hover:hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50,#f2f2f2);--border-radius:14px;--button-color:var(--ion-color-step-600,#666);--color:var(--ion-color-step-850,#262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);top:0}.toast-wrapper.toast-middle{opacity:.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;border:0;background-color:transparent;color:var(--ion-color-primary,#3880ff);font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.activated{opacity:.4}\@media (any-hover:hover){.toast-button:hover{opacity:.6}}"; }
    static get styleMode() { return "ios"; }
}
function buttonClass(button) {
    return Object.assign({ 'toast-button': true, 'toast-button-icon-only': button.icon !== undefined && button.text === undefined, [`toast-button-${button.role}`]: button.role !== undefined, 'ion-focusable': true, 'ion-activatable': true }, getClassMap(button.cssClass));
}

class ToastController {
    create(opts) {
        return createOverlay(this.doc.createElement('ion-toast'), opts);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, 'ion-toast', id);
    }
    async getTop() {
        return getOverlay(this.doc, 'ion-toast');
    }
    static get is() { return "ion-toast-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
}

export { Toast as IonToast, ToastController as IonToastController };
