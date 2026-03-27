import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),

  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    count: (state) =>
      state.items.reduce((sum, item) => sum + item.qty, 0),
  },

  actions: {
    addItem(product) {
      const existing = this.items.find((i) => i._id === product._id);
      if (existing) {
        existing.qty++;
      } else {
        this.items.push({ ...product, qty: 1 });
      }
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i._id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});
