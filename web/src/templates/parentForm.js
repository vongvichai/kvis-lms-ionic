exports.render = () => {
    return `<form>
    <ion-grid>
        <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
                <div padding>
                    <input type="hidden" data-id>
                    <ion-row>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">Name:</ion-label>
                                <ion-input type="text" required readonly data-name></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">Surname:</ion-label>
                                <ion-input required data-surname></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">Gender:</ion-label>
                                <ion-select required interface="popover" data-gender>
                                    <ion-select-option value="M">Male</ion-select-option>
                                    <ion-select-option value="F">Female</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">Phone:</ion-label>
                                <ion-input required data-phone></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">Email:</ion-label>
                                <ion-input type="text" required data-email></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">Students:</ion-label>
                                <ion-input type="text" data-students></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                </div>
                <div padding>
                    <ion-button size="large" type="submit" expand="block">Save</ion-button>
                </div>
            </ion-col>
        </ion-row>
    </ion-grid>
</form>`;
};