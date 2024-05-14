import { defineStore } from "pinia";
import axios from "../libs/axios";

export const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    currencyItems: ["BTCUSDT", "BNBBTC", "ETHBTC"],
    currency: "BTCUSDT",
    history: [],
  }),
  getters: {
    getCurrency: (state) => state.currency,
    getHistory: (state) => state.history,
  },
  actions: {
    addHistoryItem(historyItem) {
      this.history.push(historyItem);
    },
  },
});
