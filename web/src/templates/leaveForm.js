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
                                <ion-input data-student_id></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col col-6>
                            <ion-item>
                                <ion-label position="floating">ชื่อ สกุลผู้ปกครอง:</ion-label>
                                <ion-input required data-parent_id></ion-input>
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
                    <!-- depart -->
                    <ion-radio-group>
                        <ion-row> 
                            <ion-col col-4>
                                <ion-item class="light-back" color="light">
                                    <ion-checkbox slot="start" color="primary" data-depart></ion-checkbox>
                                    <ion-label>ขาออก:</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio slot="start" data-depart_shuttle_bus></ion-radio>
                                    <ion-label>จองรถรับส่ง</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio slot="start" data-depart_self_arrange></ion-radio>
                                    <ion-label>เดินทางเอง</ion-label>
                                </ion-item>
                            </ion-col>
                        </ion-row>
                    </ion-radio-group>
                    <ion-row data-depart_schedule>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เวลารถออก:</ion-label>
                                <ion-select required interface="popover" data-depart_time_table_id>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">สถานี:</ion-label>
                                <ion-select required interface="popover" data-depart_station_id>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data-depart_datetime>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เดินทาง:วันที่</ion-label>
                                <ion-datetime data-depart_date display-format="DD MMM YYYY"></ion-datetime>
                            </ion-item>
                        </ion-col>                        
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เวลา</ion-label>
                                <ion-datetime data-depart_time display-format="HH:mm"></ion-datetime>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data-depart_pickup>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">รับกลับโดย:</ion-label>
                                <ion-select required interface="popover" data-pickup>
                                    <ion-select-option value="1">กลับเอง</ion-select-option>
                                    <ion-select-option value="2">ผู้ปกครอง</ion-select-option>
                                    <ion-select-option value="9">บุคคลอื่น</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">ชื่อสกุล/โทรศัพท์:</ion-label>
                                <ion-input type="text" data-pickup_info></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <!-- arrive -->
                    <ion-radio-group>
                        <ion-row> 
                            <ion-col col-4>
                                <ion-item class="light-back" color="light">
                                    <ion-checkbox slot="start" color="primary" data-arrive></ion-checkbox>
                                    <ion-label>ขากลับ:</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio slot="start" required data-arrive_shuttle_bus></ion-radio>
                                    <ion-label>จองรถรับส่ง</ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-radio slot="start" data-arrive_self_arrange></ion-radio>
                                    <ion-label>เดินทางเอง</ion-label>
                                </ion-item>
                            </ion-col>
                        </ion-row>
                    </ion-radio-group>

                    <ion-row data-arrive_schedule>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เวลารถออก:</ion-label>
                                <ion-select required interface="popover" data-arrive_time_table_id>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">สถานี:</ion-label>
                                <ion-select required interface="popover" data-arrive_station_id>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data-arrive_datetime>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เดินทาง:วันที่</ion-label>
                                <ion-datetime data-arrive_date display-format="DD MMM YYYY"></ion-datetime>
                            </ion-item>
                        </ion-col>                        
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">เวลา</ion-label>
                                <ion-datetime data-arrive_time display-format="HH:mm"></ion-datetime>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data-arrive_dropOff>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">มาส่งโดย:</ion-label>
                                <ion-select required interface="popover" data-dropOff>
                                    <ion-select-option value="1">กลับเอง</ion-select-option>
                                    <ion-select-option value="2">ผู้ปกครอง</ion-select-option>
                                    <ion-select-option value="9">บุคคลอื่น</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-label position="floating">ชื่อสกุล/โทรศัพท์:</ion-label>
                                <ion-input type="text" data-dropOff_info></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row data-cancelled_row>
                        <ion-col>
                            <ion-item>
                                <ion-checkbox slot="start" data-cancelled></ion-checkbox>
                                <ion-label>ยกเลิก</ion-label>
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