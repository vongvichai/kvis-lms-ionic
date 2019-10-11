exports.render = () => {
    return `<form>
    <ion-grid>
        <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
                <div padding>
                    <ion-row>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">เลขที่/วันที่คำขอ:</ion-label>
                                <ion-select required interface="popover" data-id>
                                    <ion-select-option value=null>เพิ่มใหม่</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">วันที่:</ion-label>
                                <ion-input required data-date></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">ชื่อ สกุลนักเรียน:</ion-label>
                                <ion-input data-student_full_name>
                                </ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">ชื่อ สกุลผู้ปกครอง:</ion-label>
                                <ion-input required data-parent_full_name></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">Reason:</ion-label>
                                <ion-input type="text" required data-reason></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">Remarks:</ion-label>
                                <ion-input type="text" data-remarks></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-radio-group>
                        <ion-row> 
                            <ion-col size="3">
                                <ion-item>
                                    <ion-label>ขาออก:</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio data-shuttle_bus></ion-radio>
                                    <ion-label> จองรถรับส่ง</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio data-oneself></ion-radio>
                                    <ion-label> เดินทางเอง</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio data-not_record></ion-radio>
                                    <ion-label> ไม่บันทึก</ion-label>
                                </ion-item>
                            </ion-col>
                        </ion-row>
                    </ion-radio-group>
                    <ion-row data-depart_shuttle_bus>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">กำหนดเวลารถออก:</ion-label>
                                <ion-select required interface="popover" data-depart_trip_id>
                                    <ion-select-option value="1">2019-09-28 8:30</ion-select-option>
                                    <ion-select-option value="2">2019-09-28 17:00</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">สถานี:</ion-label>
                                <ion-select required interface="popover" data-depart_station_id>
                                    <ion-select-option value="1">PPT Head Office</ion-select-option>
                                    <ion-select-option value="2">Suwannaphumi Airport</ion-select-option>
                                    <ion-select-option value="3">Don Maueng Airport</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data-depart_oneself>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เดินทาง:วันที่</ion-label>
                                <ion-datetime display-format="DD MMM YYYY"></ion-datetime>
                            </ion-item>
                        </ion-col>                        
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เวลา</ion-label>
                                <ion-datetime display-format="HH:MM"></ion-datetime>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data_depart_pickup>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">รับกลับโดย:</ion-label>
                                <ion-select required interface="popover" data-depart_by>
                                    <ion-select-option value="1">กลับเอง</ion-select-option>
                                    <ion-select-option value="2">ผู้ปกครอง</ion-select-option>
                                    <ion-select-option value="9">บุคคลอื่น</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">ชื่อสกุล/โทรศัพท์:</ion-label>
                                <ion-input type="text" data-depart_info></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">arrive_id:</ion-label>
                                <ion-input type="text" required data-arrive_id></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">arrive_vehicle_id:</ion-label>
                                <ion-input type="text" data-arrive_vehicle_id></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">arrive_trip_id:</ion-label>
                                <ion-input type="text" required data-arrive_trip_id></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">arrive_station_id:</ion-label>
                                <ion-input type="text" data-arrive_station_id></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">arrive_by:</ion-label>
                                <ion-input type="text" required data-arrive_by></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">arrive_info:</ion-label>
                                <ion-input type="text" data-arrive_info></ion-input>
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
/*
    this.body.querySelector("[data-depart_id]").value = depart.tripId;
    this.body.querySelector("[data-depart_vehicle_id]").value = depart.vehicleId;
    this.body.querySelector("[data-depart_trip_id]").value = depart.tripId;
    this.body.querySelector("[data-depart_station_id]").value = depart.stationId;
    this.body.querySelector("[data-depart_by]").value = depart.by;
    this.body.querySelector("[data-arrive_info]").value = arrive.info;
    this.body.querySelector("[data-arrive_id]").value = arrive.tripId;
    this.body.querySelector("[data-arrive_vehicle_id]").value = arrive.vehicleId;
    this.body.querySelector("[data-arrive_trip_id]").value = arrive.tripId;
    this.body.querySelector("[data-arrive_station_id]").value = arrive.stationId;
    this.body.querySelector("[data-arrive_by]").value = arrive.by;
    this.body.querySelector("[data-arrive_info]").value = arrive.info;
*/