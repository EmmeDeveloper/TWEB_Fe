Vue.component("input-text", {
  props: {
    type: String,
    id: String,
    name: String,
    modelValue: String,
  },
  template: `
    <div class="flex flex-column gap-1" style="margin-bottom: 15px;">
        <label :for="id">{{name}}</label>
        <input :value="modelValue" @input="handleInput" :type="type" :id="id" :name="name">
    </div>
  `,
  data() {
    return {};
  },

  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
});
