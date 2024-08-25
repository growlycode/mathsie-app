export const listWithItemReplaced = <T extends { id: any }>(id: any, item: T, list: T[]) => {
    console.log('Replacing ', id);
    const existing = list.findIndex(i => i.id === id);
    if (existing < 0) return list;

    const arrayCopy = Array.from(list)
    arrayCopy.splice(existing, 1, { ...item })
    return arrayCopy;
}

export const NumberRange = {

    from: (start: number, end: number) => {
        return Array.from({ length: (end - start) }, (v, k) => k + start);
    }
}

export const iterator = (size: number): number[] => [...Array(size).keys()]


export function shuffle(array :any[], random: (start: number, end: number) => number) {

    // return array.map(x => [random(), x]).sort().map(([_, x]) => x)

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(random(0, 1) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

