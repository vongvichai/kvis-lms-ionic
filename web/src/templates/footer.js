exports.render = path => {
    let isStudents = path === "students" ? "active" : "";
    let isParents = path === "parents" ? "active" : "";
    let isUser = path === "user" ? "active" : "";
    return `<ion-tabs>
            <ion-tab-bar slot="bottom">

            <ion-tab-button tab="station" data-path="stations">
                <ion-label>Station</ion-label>
                <ion-icon name="bus"></ion-icon>
            </ion-tab-button>
        
                <ion-tab-button tab="person" data-path="students">
                    <ion-label>Student</ion-label>
                    <ion-icon name="person"></ion-icon>
                </ion-tab-button>
                
                <ion-tab-button tab="parent" data-path="parents">
                    <ion-label>Parent</ion-label>
                    <ion-icon name="contacts"></ion-icon>
                </ion-tab-button>

                <ion-tab-button tab="user" data-path="user">
                    <ion-label>User</ion-label>
                    <ion-icon name="person"></ion-icon>
                </ion-tab-button>
                
                <ion-tab-button tab="schedule" data-path="schedules">
                    <ion-label>Schedule</ion-label>
                    <ion-icon name="clock"></ion-icon>
                </ion-tab-button>

                <ion-tab-button tab="leave" data-path="LeaveForm">
                    <ion-label>Leave</ion-label>
                    <ion-icon name="document"></ion-icon>
                </ion-tab-button>
                
                <ion-tab-button tab="exit" data-logout>
                    <ion-label>Exit</ion-label>
                    <ion-icon name="exit"></ion-icon>
                </ion-tab-button>
            
        </ion-tab-bar>
    </ion-tab>`
};