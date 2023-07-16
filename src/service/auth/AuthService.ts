import {post} from "@/util/http";
import type {Response} from "@/util/http";

export type Auth = {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export const AuthService = {
    async login(userName: string, password: string): Promise<Response<Auth>> {
        return post<Auth>( "/oauth2/token",
            {
                "grant_type": "password",
                "client_id": import.meta.env.VITE_CLIENT_ID,
                "username": userName,
                "password": password
            }
        )
    }
}
