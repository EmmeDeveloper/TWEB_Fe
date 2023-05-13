Vue.component("home", {
  template: `
    <header>
        <navbar></navbar>
        <div class="home-text-image">
            <div class="text-box">
                <p class="home-title">Trova l'insegnante ideale</p>
                <p class="home-subtitle">Lezioni online o in presenza!</p>
            </div>
            <img src="./assets/home-image.png" class="home-image"/>
        </div>
    </header> 
  `,

  data() {
    return {};
  },
});
