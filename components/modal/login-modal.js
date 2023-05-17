Vue.component("login-modal", {
  template: `
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="login(emailValue,passwordValue)">
          <div class="modal-header flex flex-row justify-center">
            <slot name="header">
              <p class="title-modal">Accedi</p>
              <img class="cursor-pointer image-position" style="width: 25px" src="./assets/x-circle.svg" @click="$emit('close')" alt="chiudi modale"/>
            </slot>
          </div>
          <div class="modal-body">
            <input-text type="email" name="email" id="email" v-model="emailValue"/>
            <input-text type="password" name="password" id="password" v-model="passwordValue" />
          </div>
          <div class="modal-footer flex justify-center">
            <button class="secondary-button cursor-pointer" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
`,

  data() {
    return {
      emailValue: "",
      passwordValue: "",
    };
  },

  methods: {
    login: (email, passowrd) => {
      console.log(email);
      console.log(passowrd);
    },
  },
});
