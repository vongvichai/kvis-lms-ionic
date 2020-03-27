import moment from "moment";

const renderSchedules = schedules => {
    return schedules.map(({ id, fromDate, toDate, expired}, idx) => {
        return `
        <ion-row sch-row data-id=${id}>
            <ion-col class="ion-align-self-center" size="1" data-id=${id}>${id}</ion-col>
            <ion-col class="ion-align-self-center" size="4" data-id=${id}>${fromDate ? moment(fromDate).format('ll') : "-"}</ion-col>
            <ion-col class="ion-align-self-center" size="4" data-id=${id}>${toDate ? moment(toDate).format('ll') : "-"}</ion-col>
            <ion-col class="ion-align-self-center" size="1" data-id=${id}>${expired ? "Yes" : "No"}</ion-col>
            <ion-col size="2">
                <ion-button block btn-edit data-id=${id}>
                    <ion-icon name="create"></ion-icon>
                </ion-button>
                <ion-button color="danger" block btn-delete data-id=${id}>
                    <ion-icon name="trash"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row>`
    }).join("");
};

exports.render = schedules => {
    if (schedules && schedules.length) {
        return `<div schedules>
        <ion-label>Booking Time</ion-label>
        <ion-grid fixed --ion-grid-padding: 0; --ion-grid-column-padding: 0;>
            <ion-row style="border-bottom: groove;">
                <ion-col size="1">
                    <ion-label>No.</ion-label>
                </ion-col>
                <ion-col size="4">
                    <ion-label>From</ion-label>
                </ion-col>
                <ion-col size="4">
                    <ion-label>To</ion-label>
                </ion-col>
                <ion-col size="1">
                    <ion-label>Exp</ion-label>
                </ion-col>
                <ion-col offset-2>                    
                </ion-col>
            </ion-row>
            ${renderSchedules(schedules)}
        </ion-grid></div>
        <ion-label>Slots aviable</ion-label>
        <ion-grid fixed --ion-grid-padding: 0; --ion-grid-column-padding: 0;>
        <div id="ttb" ttb-headers>
            <ion-row style="border-bottom: groove;">
                <ion-col size="1">
                    <ion-label>No.</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Route</ion-label>
                </ion-col>
                <ion-col size="3">
                    <ion-label>Date</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Time</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Station</ion-label>
                </ion-col>
                <ion-col offset-2>                    
                </ion-col>
            </ion-row>
        </div>
        <div ttb-details>
        </div>        
        </ion-grid>`;
    }
    return `<h4 class="text-center">No parent.</h4>`;
}

exports.renderTimeTable = data => {
    return data.TimeTables.map(({id, trip, tripType, datetime, Stations}, idx) => {
        let station = Stations[0];
        Stations.shift();
        let followingRow = Stations.map(s => {
            return `
            <ion-row>
                <ion-col size="8"></ion-col>
                <ion-col class="ion-align-self-center" size="2">${s.name.slice(0,3)}</ion-col>
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
        return `
        <ion-row>
            <ion-col class="ion-align-self-center" size="1">${idx+1}</ion-col>
            <ion-col class="ion-align-self-center" size="2">${tripType}</ion-col>
            <ion-col class="ion-align-self-center" size="3">${moment(datetime).format('ll')}</ion-col>
            <ion-col class="ion-align-self-center" size="2">${moment(datetime).format('LT')}</ion-col>
            <ion-col class="ion-align-self-center" size="2">${station.name.slice(0,3)}</ion-col>
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
        </ion-row>
        ${followingRow}`;
    }).join("");
}