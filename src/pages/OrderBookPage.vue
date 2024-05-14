<script setup>
import {computed, onMounted, ref, watch} from "vue";
import PageWrapper from "@/components/PageWrapper.vue";
import { useOrderBookStore } from "@/store/orderBookStore";
import dayjs from "dayjs";
import {useSettingsStore} from "@/store/settingsStore";

const limit = ref(100);

const orderBookStore = useOrderBookStore();
const settingsStore = useSettingsStore();

const sortedBids = computed(() => {
  return Object.entries(orderBookStore.bids).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
});

const sortedAsks = computed(() => {
  return Object.entries(orderBookStore.asks).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
});

onMounted(async () => {
  if(Object.keys(orderBookStore.bids).length === 0){
    await orderBookStore.fetchSnapshot(settingsStore.currency);
    orderBookStore.setWebSocket(settingsStore.currency);
  }
})

watch(limit, async (newLimit) => {

  orderBookStore.limit = newLimit;

  await orderBookStore.fetchSnapshot(settingsStore.currency, newLimit);
  orderBookStore.closeWebSocket();
  orderBookStore.isFirstMessage = true;
  orderBookStore.setWebSocket(settingsStore.currency);
});
</script>
<template>
  <PageWrapper>
    <div class="order_book_page">
      <h2>Order Book</h2>
      <div>
        <h3>Limit</h3>
        <v-select
          :items="orderBookStore.limitItems"
          v-model="limit"
        ></v-select>
      </div>
      <div class="order_book_page-depth">
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="order-card">
              <v-card-title>
                Bids
              </v-card-title>
              <v-table class="order-table" theme="light" :fixed-header="true" :height="600">
                <thead>
                <tr>
                  <th class="text-left">Price</th>
                  <th class="text-left hide-on-mobile">Quantity</th>
                  <th class="text-left">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in sortedBids" :key="item.id">
                  <td>{{ item[0] }}</td>
                  <td class="hide-on-mobile">{{ item[1] }}</td>
                  <td>{{ item[0] * item[1] }}</td>
                </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="order-card">
              <v-card-title>
                Asks
              </v-card-title>
              <v-table class="order-table" theme="light" :fixed-header="true" :height="600">
                <thead>
                <tr>
                  <th class="text-left">Price</th>
                  <th class="text-left hide-on-mobile">Quantity</th>
                  <th class="text-left">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in sortedAsks" :key="item.id">
                  <td>{{ item[0] }}</td>
                  <td class="hide-on-mobile">{{ item[1] }}</td>
                  <td>{{ item[0] * item[1] }}</td>
                </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped>
.order_book_page {
  padding: 1rem 2rem;
}
.order_book_page-depth{
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.order_book_page {
  padding: 16px;
}

.order-card {
  height: 600px;
}

.order-table {
  overflow-y: auto;
}

.order-table thead {
  position: sticky;
  top: 0;
  background: white;
}

@media (max-width: 600px) {
  .order_book_page {
    padding: 5px 15px;
  }
  .hide-on-mobile {
    display: none;
  }
}
</style>
