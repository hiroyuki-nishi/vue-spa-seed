import type { Router } from 'vue-router';
import {AuthConfig} from "@/service/auth/AuthConfig";

export const authenticationGuard = (router: Router) => {
  router.beforeEach((to) => {
      const routeName = to.name ?? "";
      if (["login"].includes(routeName as string)) {
          AuthConfig.clear();
          return true;
      }
      // 既に認証されていれば何もしない
      if (AuthConfig.isAuthenticated()) {
          return true;
      } else {
          // NOTE: 認証後のリダイレクトで遷移前の画面のクエリパラメーターなど考慮したければ追加で対応する
          AuthConfig.clear();
          return { name: "login" };
    }
  });
};