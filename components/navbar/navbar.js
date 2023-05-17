Vue.component("navbar", {
  template: `
    <nav>
        <div>
            <a href="#home" class="primary-text">Home</a>
            <a href="#" class="primary-text">?</a>
            <a href="#" class="primary-text">?</a>
            <a href="#" class="primary-text">?</a>
        </div>
        <div>
            <button class="primary-button" @click="showModalLogin = true">Accedi</button>
            <button class="primary-button">Iscriviti</button>
        </div>
        <login-popup v-if="showModalLogin" @close="showModalLogin = false"></login-popup>
    </nav>
  `,

  data() {
    return {
      showModalLogin: false,
    };
  },
});
