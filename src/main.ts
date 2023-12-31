import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia';
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(createPinia());
app.use(VueApexCharts);

app.mount('#app');
