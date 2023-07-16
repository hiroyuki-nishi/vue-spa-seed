<template>
  <q-layout>
    <q-header v-if="isLogin" class="header">
      <q-toolbar class="shadow-2">
        <q-btn flat round dense icon="menu" @click="showDrawer = !showDrawer" />
        <q-toolbar-title shrink>
        </q-toolbar-title>
        <q-space />
        <div>
          <q-btn-dropdown icon="account_circle" :label="userName" flat>
            <q-list>
              <q-item v-close-popup clickable @click="onLogout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>ログアウト</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        :width="200"
        overlay
        bordered
        persistent
        v-model="showDrawer"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
              clickable v-ripple
              :to="{name: 'example'}"
          >
            <q-item-section avatar>
              <q-icon name="apartment" />
            </q-item-section>
          </q-item>
          <q-separator  />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <RouterView style="width: 100vw;"/>
  </q-layout>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {ref, watch} from "vue";
import {AuthConfig} from "@/service/auth/AuthConfig";
import {authenticationGuard} from "@/service/auth/AuthGuard";

const route = useRoute();
const router = useRouter();
const isLogin = ref(false);
const userName = ref("");
const showDrawer = ref(false);

authenticationGuard(router);

watch(route, (_) => showMenu());

const showMenu = () => {
  isLogin.value = AuthConfig.isAuthenticated();
  userName.value = AuthConfig.getUserName();
}

const onLogout = () => {
  AuthConfig.clear();
  router.push("login");
};
</script>

<style scoped>
.header {
  background: #434040;
  width: 100vw;
  position: fixed;
}

</style>
