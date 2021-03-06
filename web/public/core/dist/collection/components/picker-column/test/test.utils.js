import { newE2EPage } from '@stencil/core/testing';
import { dragElementBy, generateE2EUrl, listenForEvent, waitForFunctionTestContext } from '../../../utils/test/utils';
export async function testPickerColumn(type, selector, rtl = false) {
    try {
        const pageUrl = generateE2EUrl('picker-column', type, rtl);
        const page = await newE2EPage({
            url: pageUrl
        });
        const screenshotCompares = [];
        const openButton = await page.find(selector);
        await openButton.click();
        await page.waitFor(250);
        screenshotCompares.push(await page.compareScreenshot());
        let colChangeCounter;
        const COL_CHANGE = 'onIonPickerColChange';
        await page.exposeFunction(COL_CHANGE, () => {
            colChangeCounter.count += 1;
        });
        const columns = await page.$$('ion-picker-column');
        for (const column of Array.from(columns)) {
            colChangeCounter = { count: 0 };
            await listenForEvent(page, 'ionPickerColChange', column, COL_CHANGE);
            await dragElementBy(column, page, 0, 100);
            await waitForFunctionTestContext((payload) => {
                return payload.colChangeCounter.count === 1;
            }, { colChangeCounter });
        }
        for (const screenshotCompare of screenshotCompares) {
            expect(screenshotCompare).toMatchScreenshot();
        }
    }
    catch (err) {
        throw err;
    }
}
