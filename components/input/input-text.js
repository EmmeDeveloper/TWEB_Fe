Vue.component("input-text", {
  props: {
    type: String,
    id: String,
    name: String,
  },
  template: `
    <div class="flex flex-column gap-1" style="margin-bottom: 15px;">
        <label v-bind:for="id">{{name}}</label>
        <input v-bind:type="type" v-bind:id="id" v-bind:name="name">
    </div>
  `,
  data() {
    return {};
  },
});
