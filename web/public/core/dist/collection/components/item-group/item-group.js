export class ItemGroup {
    hostData() {
        return {
            'role': 'group',
            class: {
                [`${this.mode}`]: true,
                [`item-group-${this.mode}`]: true,
                'item': true
            }
        };
    }
    static get is() { return "ion-item-group"; }
    static get style() { return "/**style-placeholder:ion-item-group:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-item-group:**/"; }
}
