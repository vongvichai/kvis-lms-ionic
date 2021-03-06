export function generateE2EUrl(component, type, rtl = false) {
    let url = `/src/components/${component}/test/${type}?ionic:_testing=true`;
    if (rtl) {
        url = `${url}&rtl=true`;
    }
    return url;
}
export const getElementProperty = async (element, property) => {
    const getProperty = await element.getProperty(property);
    if (!getProperty) {
        return '';
    }
    return getProperty.jsonValue();
};
export const listenForEvent = async (page, eventType, element, callbackName) => {
    try {
        return await page.evaluate((scopeEventType, scopeElement, scopeCallbackName) => {
            scopeElement.addEventListener(scopeEventType, (e) => {
                window[scopeCallbackName](e);
            });
        }, eventType, element, callbackName);
    }
    catch (err) {
        throw err;
    }
};
export const dragElementBy = async (element, page, x = 0, y = 0) => {
    try {
        const boundingBox = await element.boundingBox();
        const startX = boundingBox.x + boundingBox.width / 2;
        const startY = boundingBox.y + boundingBox.height / 2;
        const endX = startX + x;
        const endY = startY + y;
        const midX = endX / 2;
        const midY = endY / 2;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(midX, midY);
        await page.mouse.move(endX, endY);
        await page.mouse.up();
    }
    catch (err) {
        throw err;
    }
};
export const waitForFunctionTestContext = async (fn, params, interval = 16) => {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            if (fn(params)) {
                clearInterval(intervalId);
                return resolve();
            }
        }, interval);
    });
};
export async function queryDeep(page, ...selectors) {
    const shadowSelectorFn = (el, selector) => (el && el.shadowRoot) && el.shadowRoot.querySelector(selector);
    return new Promise(async (resolve) => {
        const [firstSelector, ...restSelectors] = selectors;
        let parentElement = await page.$(firstSelector);
        for (const selector of restSelectors) {
            parentElement = await page.evaluateHandle(shadowSelectorFn, parentElement, selector);
        }
        if (parentElement) {
            resolve(parentElement);
        }
    });
}
export async function checkComponentModeClasses(el, selector) {
    const component = selector !== undefined ? selector : el.nodeName.toLowerCase().replace('ion-', '');
    const mode = await el.getProperty('mode');
    expect(el).toHaveClass(`${component}-${mode}`);
}
export async function checkModeClasses(el) {
    const mode = await el.getProperty('mode');
    expect(el).toHaveClass(`${mode}`);
}
