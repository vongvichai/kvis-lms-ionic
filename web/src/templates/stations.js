const renderStations = stations => {
    return stations.map((station, idx) => {
        return `
        <ion-row>
            <ion-col size="2">
                <ion-item>${station.id}</ion-item>
            </ion-col>
            <ion-col size="8">
                <ion-item>
                    <ion-input value="${station.name}" data-name-${station.id}></ion-input></ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>
                    <ion-button block btn-save data-id=${station.id}>
                        <ion-icon name="checkmark-circle"></ion-icon>
                    </ion-button>
                    <ion-button color="danger" block btn-delete data-id=${station.id}>
                        <ion-icon name="trash"></ion-icon>
                    </ion-button>
                </ion-item>
            </ion-col>
        </ion-row>`
    }).join("");
};
exports.render = stations => {
    if (stations && stations.length) {
        return `<ion-grid fixed --ion-grid-padding: 0; --ion-grid-column-padding: 0; item-content>
            <ion-row style="border-bottom: groove;">
                <ion-col size="2">
                    <ion-label>ID.</ion-label>
                </ion-col>
                <ion-col size="5">
                    <ion-label>Name</ion-label>
                </ion-col>
                <ion-col offset-2 col-3>

                </ion-col>
            </ion-row>
            ${renderStations(stations)}
            <ion-row>
                <ion-col size="2">
                    <ion-item>new</ion-item>
                </ion-col>
                <ion-col size="8">
                    <ion-item>
                        <ion-input value="" data-name-new></ion-input></ion-item>
                </ion-col>
                <ion-col size="2">
                    <ion-item>
                        <ion-button block btn-add data-id="new">
                            <ion-icon name="add"></ion-icon>
                        </ion-button>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-grid>`;
    }
    return `<h4 class="text-center">No station.</h4>`;
}