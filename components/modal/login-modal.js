Vue.component("login-modal", {
  template: `
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header flex flex-row justify-center">
            <slot name="header">
              <p class="title-modal">Accedi</p>
              <img class="cursor-pointer image-position" style="width: 25px" src="./assets/x-circle.svg" @click="$emit('close')" alt="chiudi modale"/>
            </slot>
          </div>
          <div class="modal-body">
            <input-text type="email" name="email" id="email" />
            <input-text type="password" name="password" id="password" />
          </div>
          <div class="modal-footer flex justify-center">
            <button class="secondary-button cursor-pointer" >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
`,

  data() {
    return {};
  },
});
