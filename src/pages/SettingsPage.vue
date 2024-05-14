<script setup>
import { useSettingsStore } from "@/store/settingsStore";
import PageWrapper from "@/components/PageWrapper.vue";
import dayjs from "dayjs";
import {onMounted, ref, watch} from "vue";
import { useOrderBookStore } from "@/store/orderBookStore";

const settingsStore = useSettingsStore();
const orderBookStore = useOrderBookStore();
const currency = ref("BTCUSDT");

onMounted(async () => {
  if(Object.keys(orderBookStore.bids).length === 0){
    await orderBookStore.fetchSnapshot(settingsStore.currency);
    orderBookStore.setWebSocket(settingsStore.currency);
  }
})

const addHistory = (currency) => {
  const history = {
    id: settingsStore.history.length + 1,
    changes: settingsStore.currency + " -> " + currency,
    timestamp: dayjs(Date.now()).format("DD.MM.YYYY HH:mm"),
  };
  settingsStore.addHistoryItem(history);
}

watch(currency, async (newCurrency) => {
  addHistory(newCurrency)

  settingsStore.currency = newCurrency;

  orderBookStore.closeWebSocket();
  orderBookStore.isFirstMessage = true;
  await orderBookStore.fetchSnapshot(settingsStore.currency);
  orderBookStore.setWebSocket(settingsStore.currency);
});
</script>

<template>
  <PageWrapper>
    <div class="settings_page">
      <h2 class="pb-2">Settings</h2>
      <div class="settings_page-currency">
        <v-select
          :items="settingsStore.currencyItems"
          v-model="currency"
        ></v-select>
      </div>
      <div class="settings_page-table">
        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Changes</th>
              <th class="text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in settingsStore.history" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.changes }}</td>
              <td>{{ item.timestamp }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped>
.settings_page {
  padding: 1rem 2rem;
}
</style>
