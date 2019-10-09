import moment from "moment";

const renderSchedules = schedules => {
    return schedules.map(({ id, expired, createdAt, updatedAt, TimeTables }, idx) => {
        let outList = "",
            inList = "";
        TimeTables.map(({ trip, tripType, datetime, Stations }) => {
            let stations = Stations.map(s => {
                return `<ion-badge color="primary">${s.name.slice(0,3)}</ion-badge>`
            });
            if (tripType == 'OUT')
                outList += `<ion-item>
                    <ion-label>${moment(datetime).format("ddd DD/MM hh:mm")}</ion-label>
                    ${stations}
                </ion-item>`
            else
                inList += `<ion-item>
                    <ion-label>${moment(datetime).format("ddd DD/MM hh:mm")}</ion-label>
                    ${stations}
                </ion-item>`;
        })
        return `
        <ion-row>
            <ion-col size="1">
                <ion-item>${id}</ion-item>
            </ion-col>
            <ion-col size="4">
                <ion-list>${outList? outList: "-"}</ion-list>
            </ion-col>
            <ion-col size="4">
                <ion-list>${inList? inList: "-"}</ion-list>
            </ion-col>
            <ion-col size="1">
                <ion-checkbox ${expired ? "checked": ""} disabled></ion-checkbox>
            </ion-col>
            <ion-col size="2">
                <ion-item>
                    <ion-button block btn-edit data-id=${id}>
                        <ion-icon name="create"></ion-icon>
                    </ion-button>
                    <ion-button color="danger" block btn-delete data-id=${id}>
                        <ion-icon name="trash"></ion-icon>
                    </ion-button>
                </ion-item>
            </ion-col>
        </ion-row>`
    }).join("");
};
exports.render = schedules => {
    if (schedules && schedules.length) {
        return `<ion-grid fixed --ion-grid-padding: 0; --ion-grid-column-padding: 0;>
            <ion-row style="border-bottom: groove;">
                <ion-col size="1">
                    <ion-label>Sch#</ion-label>
                </ion-col>
                <ion-col size="4">
                    <ion-label>Out</ion-label>
                </ion-col>
                <ion-col size="4">
                    <ion-label>In</ion-label>
                </ion-col>
                <ion-col size="1">
                    <ion-label>Exp.</ion-label>
                </ion-col>
                <ion-col offset-2>                    
                </ion-col>
            </ion-row>
            ${renderSchedules(schedules)}
        </ion-grid>`;
    }
    return `<h4 class="text-center">No parent.</h4>`;
}