import {LocalStorage} from "@/util/localStorage";
import type {JwtPayload} from "jwt-decode";
import jwtDecode from "jwt-decode";

export const AuthConfig = {
    ACCESS_TOKEN: "access_token",
    USER_NAME: "user_name",

    save(accessToken: string, userName: string): void {
        LocalStorage.setItem(AuthConfig.ACCESS_TOKEN, accessToken);
        LocalStorage.setItem(AuthConfig.USER_NAME, userName);
    },
    getUserName(): string {
        return LocalStorage.getItem(AuthConfig.USER_NAME) ?? "";
    },
    clear(): void {
        LocalStorage.removeItem(AuthConfig.ACCESS_TOKEN);
        LocalStorage.removeItem(AuthConfig.USER_NAME);
    },
    isAuthenticated(): boolean {
        try {
            const jwt: JwtPayload = jwtDecode(LocalStorage.getItem(AuthConfig.ACCESS_TOKEN));
            return jwt.exp ? Date.now() / 1000 < jwt.exp : false;
        } catch (e) {
            return false;
        }
    }
}

