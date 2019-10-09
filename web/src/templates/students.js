const renderParents = students => {
    return students.map((student, idx) => {
        let parentList = student.Parents.reduce((acc, parent) => {
            return acc +
                `<ion-button block btn-parent-edit data-id=${parent.id}>${parent.name}
                <ion-icon name="create"></ion-icon>
            </ion-button>`
        }, [])
        return `
        <ion-row>
            <ion-col size="1">
                <ion-item>${idx + 1}</ion-item>
            </ion-col>
            <ion-col size="3">
                <ion-item>${student.code} ${student.fullName}</ion-item>
            </ion-col>
            <ion-col size="1">
                <ion-item>${student.gender}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>${student.phone}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>${parentList}</ion-item>
            </ion-col>
            <ion-col size="2">
                <ion-item>
                    <ion-button block btn-edit data-id=${student.id}>
                        <ion-icon name="create"></ion-icon>
                    </ion-button>
                    <ion-button color="danger" block btn-delete data-id=${student.id}>
                        <ion-icon name="trash"></ion-icon>
                    </ion-button>
                </ion-item>
            </ion-col>
        </ion-row>`
    }).join("");
};
exports.render = students => {
    if (students && students.length) {
        return `<ion-grid fixed --ion-grid-padding: 0; --ion-grid-column-padding: 0;>
            <ion-row style="border-bottom: groove;">
                <ion-col size="1">
                    <ion-label >No.</ion-label>
 s               </ion-col>
                <ion-col size="4">
                    <ion-label>Full Name</ion-label>
                </ion-col>
                <ion-col size="1">
                    <ion-label>Gender</ion-label>
                </ion-col>
                <ion-col size="2">
                    <ion-label>Phone</ion-label>
                </ion-col>
                <ion-col size="3">
                    <ion-label>Email</ion-label>
                </ion-col>
            </ion-row>
            ${renderParents(students)}
        </ion-grid>`;
    }
    return `<h4 class="text-center">No student.</h4>`;
}