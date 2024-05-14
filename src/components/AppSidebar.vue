<script setup>
import { useRouter } from "vue-router";
import {ref} from "vue";

const router = useRouter();
const drawer = ref(false)
const tab =  ref(null)
const items = ref([
  { name: 'Settings', value: "/Settings"},
  { name: 'Order Book', value: "/OrderBook"}
])
const navigateTo = (index) => {
  router.push(index);
};
</script>
<template>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <img src="../assets/logo.png" alt="logo" style="max-width: 40px; margin-left: 2rem" />
      <v-toolbar-title>BINANCE DEPTH</v-toolbar-title>
      <v-tabs
        v-model="tab"
        align-with-title
        class="d-none d-sm-flex"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item.name" @click="navigateTo(item.value)">
          {{ item.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <!-- Add a navigation bar -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="item in items" :key="item.name">
            <v-list-item-title @click="navigateTo(item.value)">{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

<!--  <v-navigation-drawer :width="201">-->
<!--    <v-list-item>-->
<!--      <div style="display: flex; align-items: center">-->
<!--        <img src="../assets/logo.png" alt="logo" style="max-width: 40px" />-->
<!--        <span class="v-list-item-title">My App</span>-->
<!--      </div>-->
<!--    </v-list-item>-->
<!--    <v-divider></v-divider>-->
<!--    <v-list-item-->
<!--      @click="navigateTo('/Settings')"-->
<!--      link-->
<!--      title="Settings"-->
<!--    ></v-list-item>-->
<!--    <v-list-item-->
<!--      @click="navigateTo('/OrderBook')"-->
<!--      link-->
<!--      title="Order Book"-->
<!--    ></v-list-item>-->
<!--  </v-navigation-drawer>-->
</template>
