const getLeaveById = (id) => {
    return {
        id: 345,
        date: '2019-09-23 13:20:00',
        student: {
            id: 23,
            fullName: 'Putuchon Vongvorakul',
            phone: '089-30411043'
        },
        parent: {
            id: 55,
            fullName: 'Vichai Vongvorakul',
            phone: '0814417595'
        },
        reason: 'Home visiting',
        remarks: 'Please let me know before you are living.',
        depart: {
            by: 1, //shuttle bus
            trip: {
                id: 21,
                date: '2019-09-27 17:00"00',
                station: {
                    id: 1,
                    name: 'PTT Head Office'
                }
            },
            pickupBy: 1,
            pickupInfo: "You have to get home alone."
        },
        arrive: {
            by: 1, //shuttle bus
            trip: {
                id: 21,
                date: '2019-09-28 14:00"00',
                station: {
                    id: 2,
                    name: 'Suwannaphumi Airport'
                }
            },
            pickupBy: 1,
            pickupInfo: "You have to come to school alone."
        }
    }
};

const getByStudentId = studentId => {

}

const getByParentId = parentId => {

}

const getDepartTripById = () => {
    return {
        id: 12,
        travelBy: 1, //shuttle bus
        trips: [{
            id: 17,
            date: '2019-09-27 17:00:00'
        }, {
            id: 18,
            date: '2019-09-28 08:30:00'
        }],
        stations: [{
            id: 1,
            name: 'PTT Head Office'
        }, {
            id: 2,
            name: 'Suwannaphi Airport'
        }], //PTT Head Office,
        by: 1, //Myself
        info: 'By somebody'
    }
}

const getArriveTripById = () => {

}

export {
    getLeaveById
};