import { ComponentInterface, QueueApi } from '../../stencil.core';
import { Mode } from '../../interface';
export declare class RippleEffect implements ComponentInterface {
    mode: Mode;
    el: HTMLElement;
    queue: QueueApi;
    win: Window;
    /**
     * Sets the type of ripple-effect:
     *
     * - `bounded`: the ripple effect expands from the user's click position
     * - `unbounded`: the ripple effect expands from the center of the button and overflows the container.
     *
     * NOTE: Surfaces for bounded ripples should have the overflow property set to hidden,
     * while surfaces for unbounded ripples should have it set to visible.
     */
    type: 'bounded' | 'unbounded';
    /**
     * Adds the ripple effect to the parent element
     */
    addRipple(pageX: number, pageY: number): Promise<() => void>;
    private readonly unbounded;
    hostData(): {
        role: string;
        class: {
            [x: string]: boolean;
            'unbounded': boolean;
        };
    };
}
