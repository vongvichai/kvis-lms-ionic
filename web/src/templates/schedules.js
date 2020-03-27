import moment from "moment";

const addRow = `<form>
<ion-row>
    <ion-col align-self-center size="1">
        <ion-label>New</ion-label>
    </ion-col>
    <ion-col align-self-center size="3">
        <ion-item><ion-input data-fromdate></ion-input></ion-item>
    </ion-col>
    <ion-col align-self-center size="3">
        <ion-item><ion-input data-todate></ion-input></ion-item>
    </ion-col>
    <ion-col ion-align-self-center size="2">-</ion-col>
    <ion-col size="3">
        <ion-button color="secondary" block btn-sch-add>
            <ion-icon name="add-circle"></ion-icon>
        </ion-button>
    </ion-col>
</ion-row></form>`

const renderSchedules = schedules => {
    return schedules.map(({ id, fromDate, toDate, expired}, idx) => {
        var fVal = fromDate ? moment(fromDate).format('L') : "-";
        var tVal = toDate ? moment(toDate).format('L') : "-";
        return `<form data-id=${id}>
        <ion-row sch-row data-id=${id}>
            <ion-col align-self-center size="1">${id}</ion-col>
            <ion-col align-self-center size="3">
                <ion-item><ion-input readonly data-id=${id} value="${fVal}" initial-val="${fVal}"></ion-input></ion-item>
            </ion-col>
            <ion-col sch-info align-self-center size="3">
                <ion-item><ion-input readonly data-id=${id} value="${tVal}" initial-val="${tVal}"></ion-input></ion-item>
            </ion-col>
            <ion-col sch-info align-self-center size="2">${expired ? "Yes" : "No"}</ion-col>
            <ion-col size="3">
                <ion-button block btn-sch-edit data-id=${id}>
                    <ion-icon name="create"></ion-icon>
                </ion-button>
                <ion-button color="danger" block btn-sch-delete data-id=${id}>
                    <ion-icon name="trash"></ion-icon>
                </ion-button>
                <ion-button color="warning" block btn-sch-details data-id=${id}>
                    <ion-icon name="apps"></ion-icon>
                </ion-button>
                <ion-button style="display: none" type="submit" color="success" block btn-sch-save data-id=${id}>
                    <ion-icon name="checkbox-outline"></ion-icon>
                </ion-button>
                <ion-button style="display: none" color="danger" block btn-sch-close data-id=${id}>
                    <ion-icon name="close-circle"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row></form>`
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
                <ion-col size="3">
                    <ion-label>From</ion-label>
                </ion-col>
                <ion-col size="3">
                    <ion-label>To</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Expired</ion-label>
                </ion-col>
                <ion-col size="3">                  
                </ion-col>
            </ion-row>
            ${renderSchedules(schedules)}
            ${addRow}
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
                <ion-col offset=2>
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
                        <ion-button block btn-edit data-id>
                            <ion-icon name="create"></ion-icon>
                        </ion-button>
                        <ion-button color="danger" block btn-delete data-id>
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