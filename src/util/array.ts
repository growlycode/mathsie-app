export const listWithItemReplaced = <T extends { id: any }>(id: any, item: T, list: T[]) => {
    console.log('Replacing ', id);
    const existing = list.findIndex(i => i.id === id);
    if (existing < 0) return list;

    const arrayCopy = Array.from(list)
    arrayCopy.splice(existing, 1, {...item })
    return arrayCopy;
}