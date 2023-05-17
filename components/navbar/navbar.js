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
            <button class="primary-button cursor-pointer" @click="showModalLogin = true">Accedi</button>
            <button class="primary-button cursor-pointer" @click="showModalSignUp = true">Iscriviti</button>
        </div>
        <login-modal v-if="showModalLogin" @close="showModalLogin = false"></login-modal>
    </nav>
  `,

  data() {
    return {
      showModalLogin: true,
      showModalSignUp: false,
    };
  },
});
