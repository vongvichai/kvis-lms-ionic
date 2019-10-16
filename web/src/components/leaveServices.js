const getLeave = (id) => {
    return {
        id: 345,
        date: '2019-09-23 13:20:00',
        studentId: 1001,
        parentId: 2002,
        leaveType: 'Weekend/Holiday',
        reason: 'Home visiting',
        remarks: 'Please let me know before you are living.',
        cancel: false
    }
};

const getLeaveDetail = id => {
    return [{
            date: '2019-11-25 13:52',
            tripId: 12,
            stationId: 1,
            pickup: '2',
            pickupInfo: "You have to get home alone."
        },
        {
            date: null,
            tripId: 18,
            stationId: 2,
            dropOff: '1',
            dropOffInfo: "You have to come to school alone."
        }
    ]
}

const getStudent = id => {
    return {
        id: 1001,
        fullName: "Putuchon Vongvorakul",
    }
}

const getParent = id => {
    return {
        id: 2002,
        fullName: "Vichai Vongvorakul",
    }
}

const getDepartTrip = (id) => {
    return [
        [{
            id: 12,
            date: '2019-09-27 17:00:00'
        }, {
            id: 18,
            date: '2019-09-28 08:30:00'
        }],
        [{
            id: 1,
            name: "PTT Head Office"
        }, {
            id: 2,
            name: "Suwannaphumi Airport"
        }] //PTT Head Office
    ]
}

const getArriveTrip = (id) => {
    return [
        [{
            id: 12,
            date: '2019-09-27 17:00:00'
        }, {
            id: 18,
            date: '2019-09-28 08:30:00'
        }],
        [{
            id: 1,
            name: "PTT Head Office"
        }, {
            id: 2,
            name: "Suwannaphumi Airport"
        }] //PTT Head Office
    ]
}

const getStation = id => {
    rteturn[{
            id: 1,
            name: 'PTT Head Office'
        }, {
            id: 2,
            name: 'Suwannaphi Airport'
        }] //PTT Head Office
}

export {
    getLeave,
    getLeaveDetail,
    getStudent,
    getParent,
    getDepartTrip,
    getArriveTrip,
    getStation
};