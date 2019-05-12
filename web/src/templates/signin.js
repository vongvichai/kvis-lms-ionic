exports.render = () => {
    return `<form>
    <ion-grid>
        <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
                <div text-center>
                    <h3>กรุณาเข้าสู่ระบบ Please Login</h3>
                </div>
                <div padding>
                    <ion-item>
                        <ion-input type="text" placeholder="Email" required data-email></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input type="password" placeholder="Password" required data-password></ion-input>
                    </ion-item>
                </div>
                <div padding>
                    <ion-button size="large" type="submit" [disabled]="f.invalid" expand="block">Login</ion-button>
                </div>
                <div padding>
                    <ion-button color="tertiary" shape="round" data-signup hidden>Sign up</ion-button>
                </div>
            </ion-col>
        </ion-row>
    </ion-grid>
</form>`;
};