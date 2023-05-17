Vue.component("login-popup", {
  template: `
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header flex flex-row justify-center">
            <slot name="header">
              <p class="title-modal">Accedi</p>
              <img class="cursor-pointer image-position" style="width: 25px" src="./assets/x-circle.svg" @click="$emit('close')"/>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body"> default body </slot>
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
