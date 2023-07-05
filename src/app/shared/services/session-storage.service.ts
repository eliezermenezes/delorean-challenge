export class SessionStorageService {
    private readonly _storage: Storage;

    constructor() {
        this._storage = sessionStorage;
    }

    public get(key: string, defaultValue?: any): any {
        const value = this._storage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return defaultValue ?? null;
    }

    public set(key: string, value: any): void {
        this._storage.setItem(key, JSON.stringify(value));
    }

    public remove(key: string): void {
        this._storage.removeItem(key);
    }
}
