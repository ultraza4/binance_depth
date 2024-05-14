import { defineStore } from "pinia";
import axios from "@/libs/axios";

export const useOrderBookStore = defineStore("orderBookStore", {
  state: () => ({
    bids: {},
    asks: {},
    lastUpdateId: null,
    webSocket: null,
    lastStreamUpdateId: null,
    isFirstMessage: true,
    limit: 100,
    limitItems: [100, 500, 1000]
  }),
  actions: {

    async fetchSnapshot(symbol = "BTCUSDT", limit = 100) {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/depth', {
          params: { symbol, limit },
        });
        const { lastUpdateId, bids, asks } = response.data;
        this.lastUpdateId = lastUpdateId;
        this.bids = Object.fromEntries(bids);
        this.asks = Object.fromEntries(asks);
      } catch (error) {
        console.error('Failed to fetch snapshot:', error);
      }
    },

    setWebSocket(currency) {
      this.webSocket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${currency.toLowerCase()}@depth`,
      );
      this.webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.e === 'depthUpdate') {
          this.updateOrderBook(data);
        }
        this.isFirstMessage = false;
      };

      this.webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    },

    closeWebSocket() {
      if (this.webSocket) {
        this.webSocket.close();
      }
    },

    updateOrderBook(event) {
      const { U, u, b, a } = event;

      if (u <= this.lastUpdateId) {
        return;
      }

      if (this.isFirstMessage && this.lastUpdateId && !(U <= this.lastUpdateId + 1) && !(u >= this.lastUpdateId + 1)) {
        console.log('Skipped first event');
        return;
      }

      if (!this.isFirstMessage && U !== this.lastStreamUpdateId + 1) {
        console.log('Skipped event due to non-sequential updates');
        return;
      }

      this.lastStreamUpdateId = u;
      b.forEach(([price, qty]) => {
        if (qty === '0.00000000') {
          delete this.bids[price];
        } else {
          this.bids[price] = qty;
        }
      });

      a.forEach(([price, qty]) => {
        if (qty === '0.00000000') {
          delete this.asks[price];
        } else {
          this.asks[price] = qty;
        }
      });

      const bidsArray = Object.entries(this.bids);
      const asksArray = Object.entries(this.asks);

      // Проверка на лимит значений в стакане
      if (bidsArray.length > this.limit) {
        const excessBids = bidsArray.length - this.limit;
        bidsArray.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])).splice(0, excessBids);
        this.bids = Object.fromEntries(bidsArray);
      }

      if (asksArray.length > this.limit) {
        const excessAsks = asksArray.length - this.limit;
        asksArray.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).splice(0, excessAsks);
        this.asks = Object.fromEntries(asksArray);
      }
    },
  },
});
