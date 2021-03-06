import '../../stencil.core';
import { ComponentInterface } from '../../stencil.core';
import { Mode } from '../../interface';
export declare class Avatar implements ComponentInterface {
    mode: Mode;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
    render(): JSX.Element;
}
