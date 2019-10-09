import moment from 'moment';

exports.render = ({ id, expired, TimeTables, Stations }) => {
    let _stations;
    let trips = TimeTables.map(({ trip, tripType, datetime, createdAt, updatedAt }) => {
        _stations = ''
        Stations.map(({ id, name }) => {
            _stations += `<ion-item>
                <ion-label>${name}</ion-label>
                <ion-checkbox slot="start" data-station_id value=${id}></ion-checkbox>
            </ion-item>`;
        })
        return `<ion-row>
            <ion-col col-1>
                <ion-item>
                    <ion-label position="floating">Type:</ion-label>
                    <ion-select required data-trip_type value="${tripType}">
                        <ion-select-option value="OUT">OUT</ion-select-option>
                        <ion-select-option value="IN">IN</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-col>
            <ion-col col-4>
                <ion-item>
                    <ion-label position="floating">Date Time:</ion-label>
                    <ion-datetime required display-format="DDD DD/MM hh:ss" data-datetime value=${datetime}></ion-datetime>
                </ion-item>
            </ion-col>
            <ion-col col-5>
                <ion-list>
                    ${_stations}
                </ion-list>
            </ion-col>
            <ion-col col-2>
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
    }).join('');

    return `<form>
    <ion-grid>
        <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
                <div padding>
                    <ion-row>
                        <ion-col col-2>
                            <ion-item>
                                <ion-label position="floating">Number:</ion-label>
                                <ion-input type="text" required readonly data-id></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col col-2>
                            <ion-item>
                                <ion-label>Expired:</ion-label>
                                <ion-checkbox data-expired slot="end"></ion-checkbox>
                            </ion-item>
                        </ion-col>
                        <ion-col col-4>
                            <ion-button size="small">Add</ion-button>                            
                        </ion-col>
                    </ion-row>
                </div>

                <div padding>${trips}</div>
            </ion-col>
        </ion-row>
    </ion-grid>
</form>`;
};