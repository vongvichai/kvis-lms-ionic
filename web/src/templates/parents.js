const renderParents = parents => {
    return parents.map((parent, idx) => {
        let studentList = parent.Students.reduce((acc, student) => {
            return acc + `
            <ion-button block btn-edit data-id=${student.id}>${student.name}
                <ion-icon name="create"></ion-icon>
            </ion-button> `
        }, '')

        return `
        <ion-row>
            <ion-col size="1">
                <ion-item>${idx + 1}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>${parent.fullName}</ion-item>
            </ion-col>
            <ion-col size="1">
                <ion-item>${parent.gender}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>${parent.phone}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>${parent.email}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>${studentList}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>
                    <ion-button block btn-edit data-id=${parent.id}>
                        <ion-icon name="create"></ion-icon>
                    </ion-button>
                    <ion-button color="danger" block btn-delete data-id=${parent.id}>
                        <ion-icon name="trash"></ion-icon>
                    </ion-button>
                </ion-item>
            </ion-col>
        </ion-row>`
    }).join("");
};
exports.render = parents => {
    if (parents && parents.length) {
        return `<ion-grid fixed --ion-grid-padding: 0; --ion-grid-column-padding: 0;>
            <ion-row style="border-bottom: groove;">
                <ion-col size="1">
                    <ion-label>No.</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Full Name</ion-label>
                </ion-col>
                <ion-col size="1">
                    <ion-label>Gender</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Phone</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Email</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Student</ion-label>
                </ion-col>
            </ion-row>
            ${renderParents(parents)}
        </ion-grid>`;
    }
    return `<h4 class="text-center">No parent.</h4>`;
}