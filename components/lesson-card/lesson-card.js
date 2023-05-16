var Navbar = Vue.component("lesson-card", {
  props: {
    title: String,
  },
  template: `
   <div class="lesson-card">
    <p>{{title}}</p>
   </div>
  `,

  data: () => {
    return {};
  },
});
