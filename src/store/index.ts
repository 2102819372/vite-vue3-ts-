import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      counter: 0,
    };
  },
  actions: {
    add() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
  getters: {
    doublecounter: (state) => state.counter * 2,
  },
});
