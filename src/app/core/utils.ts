export class Utils {
    static generateId(list: any[]): number {
        if (list.length) {
            return Math.max(...list.map((l) => l.id), 0) + 1;
        }
        return 1;
    }
}
