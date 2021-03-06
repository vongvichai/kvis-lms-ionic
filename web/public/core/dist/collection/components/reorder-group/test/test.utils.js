import { dragElementBy, queryDeep } from '../../../utils/test/utils';
export async function moveReorderItem(id, page, direction = 'up', numberOfSpaces = 1, ...parentSelectors) {
    try {
        const reorderItem = parentSelectors && parentSelectors.length > 0 ? await (await queryDeep(page, ...parentSelectors)).$(id) : await page.$(id);
        if (!reorderItem) {
            throw new Error('Reorder Item is undefined');
        }
        const boundingBox = await reorderItem.boundingBox();
        if (!boundingBox) {
            throw new Error('Reorder Item bounding box is undefined');
        }
        await dragElementBy(reorderItem, page, 0, (direction === 'up') ? -(boundingBox.height * numberOfSpaces) : (boundingBox.height * numberOfSpaces));
    }
    catch (err) {
        throw err;
    }
}
