import { App } from './src/App.js'; // Importem el component App
// Importem només els altres mòduls locals

document.addEventListener('DOMContentLoaded', () => {
    // Inicialitza el joc
    console.log('Game initialized successfully.');

    // Muntem Vue a l'element #app
    Vue.createApp(App).mount('#app');

    console.log('Vue.js App initialized successfully.');
});
