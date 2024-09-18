import "primevue/resources/themes/saga-blue/theme.css";

import { createApp } from 'vue';
import App from './App.vue';
import roteador from './router';
import Menubar from 'primevue/menubar';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import 'vuetify/dist/vuetify.min.css';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmPopup from 'primevue/confirmpopup';
import Menu from 'primevue/menu';
import Password from 'primevue/password';
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)
  .use(PrimeVue)
  .use(roteador)
  .use(ConfirmationService)
  .component('Menubar', Menubar)
  .component('InputText', InputText)
  .component('InputMask', InputMask)
  .component('ConfirmPopup', ConfirmPopup)
  .component('InputNumber',InputNumber)
  .component('Button', Button)
  .component('Dropdown', Dropdown)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('ColumnGroup', ColumnGroup)
  .component('Row', Row)
  .component('Dialog', Dialog)
  .component('Card',Card)
  .component('Calendar', Calendar)
  .component('Checkbox',Checkbox)
  .component('Menu', Menu)
  .component('Password', Password);

app.mount('#app');
