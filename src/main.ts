import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';
import classes from './styles/demo.module.scss';
console.log(classes);
import axiosInstance from './api/index';

console.log(axiosInstance.instance);

createApp(App).mount('#app');
