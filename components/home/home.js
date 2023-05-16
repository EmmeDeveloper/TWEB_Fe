Vue.component("home", {
  template: `
  <header>
    <navbar></navbar>
    <div class="home-text-image">
      <div class="text-box">
        <p class="home-title">Trova l'insegnante ideale</p>
        <p class="home-subtitle">Lezioni online o in presenza!</p>
      </div>
      <img src="./assets/home-image.png" class="home-image" />
    </div>
    <article class="article-courses">
      <p stile="margin-bottom:30px;">Un professore per ogni materia</p>
      <div class="flex flex-row gap-2">
        <lesson-card
          v-for="course in courses"
          :title="course.title"
          :key="course.id"
        ></lesson-card>
      </div>
    </article>
  </header>
`,

  data() {
    return {
      courses: [],
    };
  },
  methods: {
    getAllCoursesService: async () => {
      try {
        const response = await fetch(`${BACKEND_LINK}/courses`);
        return await response.json();
      } catch (error) {
        return console.log(error);
      }
    },
  },
  beforeMount() {
    this.getAllCoursesService().then((res) => {
      this.courses = res.courses;
    });
  },
});
