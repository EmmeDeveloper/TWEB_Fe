<script>
// import { BACKEND_LINK } from '../../environment.js'

// const courses = []

// getAllCoursesService = async () => {
//   try {
//     const response = await fetch(`${BACKEND_LINK}/courses`)
//     return await response.json()
//   } catch (error) {
//     return console.log(error)
//   }
// }

//  beforeMount() {
//    this.getAllCoursesService().then((res) => {
//      this.courses = res.courses;
//    });
//  }
</script>

<template>
  <div class="home-text-image">
    <div class="text-box">
      <p class="home-title">Trova l'insegnante ideale</p>
      <p class="home-subtitle">Lezioni online o in presenza!</p>
    </div>
    <img src="../../assets/home-image.png" class="home-image" />
  </div>
  <article class="article-courses">
    <p stile="margin-bottom:30px;">Un professore per ogni materia</p>
    <div class="flex flex-row gap-2">
      <!-- <lesson-card v-for="course in courses" :title="course.title" :key="course.id"></lesson-card> -->
    </div>
  </article>
</template>

<style>
.home-text-image {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  height: 90vh;
  align-items: center;
}

.text-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 300px;
}

.home-image {
  max-width: 40%;
}

.home-title {
  font-size: 60px;
  font-weight: 900;
  margin-bottom: 10px;
}

.home-subtitle {
  font-size: 25px;
}

.article-courses {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
}

.article-courses {
  color: rgb(4, 107, 153);
  font-weight: 900;
  font-size: 30px;
}

@media (max-width: 1024px) {
  .home-text-image {
    width: 100vw;
    flex-direction: column;
    height: 100dvh;
  }

  .text-box {
    width: 100%;
    height: 100dvh;
  }
}
</style>
