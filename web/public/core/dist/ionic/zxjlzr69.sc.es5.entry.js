var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(a,s)}l((o=o.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Ionic.loadBundle("zxjlzr69",["exports","./chunk-c0d86ae2.js","./chunk-efee13a5.js","./chunk-6aa900a7.js","./chunk-7348297b.js","./chunk-787a2802.js"],function(e,t,n,o,r,i){var a=window.Ionic.h;function s(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".modal-wrapper")),r.beforeStyles({opacity:1}).fromTo("translateY","100%","0%"),o.fromTo("opacity",.01,.4),Promise.resolve(n.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(400).beforeAddClass("show-modal").add(o).add(r))}function l(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e,i=t.querySelector(".modal-wrapper");r.addElement(i);var a=i.getBoundingClientRect();return r.beforeStyles({opacity:1}).fromTo("translateY","0%",t.ownerDocument.defaultView.innerHeight-a.top+"px"),o.fromTo("opacity",.4,0),Promise.resolve(n.addElement(t).easing("ease-out").duration(250).add(o).add(r))}function d(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".modal-wrapper")),r.fromTo("opacity",.01,1).fromTo("translateY","40px","0px"),o.fromTo("opacity",.01,.32),Promise.resolve(n.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).beforeAddClass("show-modal").add(o).add(r))}function c(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e,i=t.querySelector(".modal-wrapper");return r.addElement(i),r.fromTo("opacity",.99,0).fromTo("translateY","0px","40px"),o.fromTo("opacity",.32,0),Promise.resolve(n.addElement(t).easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).add(o).add(r))}var u=function(){function e(){this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0}return e.prototype.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),this.dismiss()},e.prototype.onBackdropTap=function(){this.dismiss(void 0,t.BACKDROP)},e.prototype.lifecycle=function(e){var t=this.usersElement,n=p[e.type];if(t&&n){var o=new CustomEvent(n,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(o)}},e.prototype.present=function(){return __awaiter(this,void 0,void 0,function(){var e,n,r;return __generator(this,function(a){switch(a.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".modal-wrapper")))throw new Error("container is undefined");return n=Object.assign({},this.componentProps,{modal:this.el}),r=this,[4,o.attachComponent(this.delegate,e,this.component,["ion-page"],n)];case 1:return r.usersElement=a.sent(),[4,i.deepReady(this.usersElement)];case 2:return a.sent(),[2,t.present(this,"modalEnter",s,d)]}})})},e.prototype.dismiss=function(e,n){return __awaiter(this,void 0,void 0,function(){var r;return __generator(this,function(i){switch(i.label){case 0:return[4,t.dismiss(this,e,n,"modalLeave",l,c)];case 1:return(r=i.sent())?[4,o.detachComponent(this.delegate,this.usersElement)]:[3,3];case 2:i.sent(),i.label=3;case 3:return[2,r]}})})},e.prototype.onDidDismiss=function(){return t.eventMethod(this.el,"ionModalDidDismiss")},e.prototype.onWillDismiss=function(){return t.eventMethod(this.el,"ionModalWillDismiss")},e.prototype.hostData=function(){var e;return{"no-router":!0,"aria-modal":"true",class:Object.assign((e={},e[""+this.mode]=!0,e),n.getClassMap(this.cssClass)),style:{zIndex:2e4+this.overlayIndex}}},e.prototype.render=function(){var e,t=((e={})["modal-wrapper"]=!0,e[""+this.mode]=!0,e);return[a("ion-backdrop",{visible:this.showBackdrop,tappable:this.backdropDismiss}),a("div",{role:"dialog",class:t})]},Object.defineProperty(e,"is",{get:function(){return"ion-modal"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"scoped"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},backdropDismiss:{type:Boolean,attr:"backdrop-dismiss"},component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},delegate:{type:"Any",attr:"delegate"},dismiss:{method:!0},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayIndex:{type:Number,attr:"overlay-index"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionModalDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionModalWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionModalWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionModalDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionDismiss",method:"onDismiss"},{name:"ionBackdropTap",method:"onBackdropTap"},{name:"ionModalDidPresent",method:"lifecycle"},{name:"ionModalWillPresent",method:"lifecycle"},{name:"ionModalWillDismiss",method:"lifecycle"},{name:"ionModalDidDismiss",method:"lifecycle"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-modal-ios-h{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color,#fff);--box-shadow:none;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:strict}.overlay-hidden.sc-ion-modal-ios-h{display:none}.modal-wrapper.sc-ion-modal-ios{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-ios-h{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}\@media only screen and (min-width:768px) and (min-height:768px){.sc-ion-modal-ios-h{--width:600px;--height:600px}}\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-ios-h{--border-radius:10px}}.modal-wrapper.sc-ion-modal-ios{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),p={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"},m=function(){function e(){}return e.prototype.create=function(e){return t.createOverlay(this.doc.createElement("ion-modal"),e)},e.prototype.dismiss=function(e,n,o){return t.dismissOverlay(this.doc,e,n,"ion-modal",o)},e.prototype.getTop=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,t.getOverlay(this.doc,"ion-modal")]})})},Object.defineProperty(e,"is",{get:function(){return"ion-modal-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),e}();e.IonModal=u,e.IonModalController=m,Object.defineProperty(e,"__esModule",{value:!0})});