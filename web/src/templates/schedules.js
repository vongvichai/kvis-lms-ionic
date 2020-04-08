import moment from "moment-timezone";

const addSchedule = `<form form-add-sch>
<ion-row>
    <ion-col align-self-center size="1">
        <ion-label>New</ion-label>
    </ion-col>
    <ion-col align-self-center size="3">
        <ion-item><ion-input type="date" data-fromdate></ion-input></ion-item>
    </ion-col>
    <ion-col align-self-center size="3">
        <ion-item><ion-input type="date" data-todate></ion-input></ion-item>
    </ion-col>
    <ion-col ion-align-self-center size="2">-</ion-col>
    <ion-col size="3">
        <ion-button color="secondary" block btn-sch-add>
            <ion-icon name="add-circle"></ion-icon>
        </ion-button>
        <ion-button color="white" block btn-sch-add-ref>
            <ion-icon style="color: black" name="refresh"></ion-icon>
        </ion-button>
    </ion-col>
</ion-row></form>`

const addTimeTable = `<form form-add-ttb>
<ion-row>
    <ion-col class="ion-align-self-center" size="1">New</ion-col>
    <ion-col class="ion-align-self-center" size="2">
        <ion-item><ion-select disabled="false" placeholder="Select Route" style="max-width: 100%;" data-add-trip>
            <ion-select-option value='IN'>IN</ion-select-option>
            <ion-select-option value='OUT'>OUT</ion-select-option>
        </ion-select></ion-item>
    </ion-col>
    <ion-col class="ion-align-self-center" size="3">
        <ion-item><ion-input type="date" data-add-date></ion-input></ion-item>
    </ion-col>
    <ion-col class="ion-align-self-center" size="2">
        <ion-item><ion-input type="time" data-add-time></ion-input></ion-item>
    </ion-col>
    <ion-col class="ion-align-self-center" size="2">
        <ion-item><ion-select disabled="false" placeholder="Select Station" multiple="true" style="max-width: 100%;" data-add-station>
            <ion-select-option value='1'>PTT</ion-select-option>
            <ion-select-option value='2'>Suw</ion-select-option>
        </ion-select></ion-item>
    </ion-col>
    <ion-col size="2">
        <ion-item>
            <ion-button color="secondary" block btn-ttb-add>
                <ion-icon name="add-circle"></ion-icon>
            </ion-button>
            <ion-button color="white" block btn-ttb-add-ref>
                <ion-icon style="color: black" name="refresh"></ion-icon>
            </ion-button>
        </ion-item>
    </ion-col>
</ion-row></form>`

const renderSchedules = schedules => {
    return schedules.map(({ id, fromDate, toDate, expired}, idx) => {
        var fVal = fromDate ? moment.tz(`${fromDate}`, 'Asia/Bangkok').format().slice(0, 10) : "-";
        var tVal = toDate ? moment.tz(`${toDate}`, 'Asia/Bangkok').format().slice(0, 10) : "-";
        return `<form data-id=${id}>
        <ion-row sch-row data-id=${id}>
            <ion-col align-self-center size="1">${idx+1}</ion-col>
            <ion-col align-self-center size="3">
                <ion-item><ion-input readonly type="date" data-id=${id} value="${fVal}" initial-val="${fVal}"></ion-input></ion-item>
            </ion-col>
            <ion-col sch-info align-self-center size="3">
                <ion-item><ion-input readonly type="date" data-id=${id} value="${tVal}" initial-val="${tVal}"></ion-input></ion-item>
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
            ${addSchedule}
            ${renderSchedules(schedules)}
        </ion-grid></div>
        <ion-label>Slots available</ion-label>
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
    return `${addTimeTable}` + data.TimeTables.map(({id, trip, tripType, datetime, Stations}, idx) => {
        var sta = [];
        Stations.map(s => {
            sta.push(`${s.id}`);
        });
        return `<form id=${idx+1} ttb-id=${id}>
            <ion-row id=${idx+1}>
                <ion-col class="ion-align-self-center" size="1">${idx+1}</ion-col>
                <ion-col class="ion-align-self-center" size="2">
                    <ion-item><ion-select data-trip disabled="true" ttb-id=${id} value="${tripType}" initial-val="${tripType}" style="max-width: 100%;">
                        <ion-select-option value='IN'>IN</ion-select-option>
                        <ion-select-option value='OUT'>OUT</ion-select-option>
                    </ion-select></ion-item>
                </ion-col>
                <ion-col class="ion-align-self-center" size="3">
                    <ion-item><ion-input type="date" data-date readonly ttb-id=${id} value="${moment.tz(`${datetime}`, 'Asia/Bangkok').format().slice(0, 10)}" 
                    initial-val="${moment.tz(`${datetime}`, 'Asia/Bangkok').format().slice(0, 10)}"></ion-input></ion-item>
                </ion-col>
                <ion-col class="ion-align-self-center" size="2">
                    <ion-item><ion-input type="time" data-time readonly ttb-id=${id} value="${moment.tz(`${datetime}`, 'Asia/Bangkok').format().slice(11, 16)}" 
                    initial-val="${moment.tz(`${datetime}`, 'Asia/Bangkok').format().slice(11, 16)}"></ion-input></ion-item>
                </ion-col>
                <ion-col class="ion-align-self-center" size="2">
                    <ion-item><ion-select disabled="true" multiple="true" data-station ttb-id=${id} style="max-width: 100%;">
                        <ion-select-option value='1'>PTT</ion-select-option>
                        <ion-select-option value='2'>Suw</ion-select-option>
                    </ion-select></ion-item>
                </ion-col>
                <ion-col size="2">
                    <ion-item>
                        <ion-button block btn-ttb-edit id=${idx+1}>
                            <ion-icon name="create"></ion-icon>
                        </ion-button>
                        <ion-button color="danger" block btn-ttb-delete id=${idx+1} ttb-id=${id}>
                            <ion-icon name="trash"></ion-icon>
                        </ion-button>
                        <ion-button style="display: none" type="submit" color="success" block btn-ttb-save id=${idx+1} ttb-id=${id}>
                            <ion-icon name="checkbox-outline"></ion-icon>
                        </ion-button>
                        <ion-button style="display: none" color="danger" block btn-ttb-close id=${idx+1}>
                            <ion-icon name="close-circle"></ion-icon>
                        </ion-button>
                    </ion-item>
                </ion-col>
            </ion-row>
        </form>`
    }).join("");
}