export const LocalStorage = {
    getItem(key: string): string {
        try {
            return localStorage.getItem(key) ?? "";
        } catch(e) {
            // TODO: グローバルエラーハンドリングでハンドリングする。
            // 個別でエラーハンドリングは基本しない
            console.log(`Error localStorage.getItem. ${e}`);
            return "";
        }
    },
    setItem(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch(e) {
            console.log(`Error localStorage.setItem. ${e}`);
        }
    },
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

}
