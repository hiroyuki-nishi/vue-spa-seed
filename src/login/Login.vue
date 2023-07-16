<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-grey-11 window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <custom-input
                      label="ユーザー名"
                      :filled="true"
                      :max-length="100"
                      :required="true"
                      @enter="onLogin"
                      v-model:modelValue="userName"
                  />
                  <custom-input
                      label="パスワード"
                      type="password"
                      :filled="true"
                      :max-length="100"
                      :required="true"
                      @enter="onLogin"
                      v-model:modelValue="password"
                  />
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-md">
                <custom-button label="ログイン" size="lg" class="full-width" @click="onLogin"/>
              </q-card-actions>
              <q-inner-loading
                  :showing="httpHandler.loading.value"
                  label-class="text-teal"
                  label-style="font-size: 1.1em"
              />
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {AuthService} from "@/service/auth/AuthService";
import {AuthConfig} from "@/service/auth/AuthConfig";
import CustomButton from "@/component/CustomButton.vue";
import CustomInput from "@/component/CustomInput.vue";
import {HttpHandler} from "@/util/http";

const httpHandler = new HttpHandler();
const router = useRouter();
const userName = ref("");
const password = ref("");

(() => AuthConfig.clear())();

const onLogin = async () => {
  httpHandler.handle(AuthService.login(userName.value, password.value)).then(res => {
    if (res?.data) {
      AuthConfig.save(res.data.access_token, userName.value);
      router.push("example");
    }
  });
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>