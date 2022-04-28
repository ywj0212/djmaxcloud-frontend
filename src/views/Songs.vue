<template>
  <div class="transition-colors duration-300 h-full bg-white dark:bg-slate-900">
    <div class="transition-colors duration-300 mx-auto py-10 prose max-w-4xl prose-slate dark:prose-invert prose-headings:text-indigo-500 dark:prose-headings:text-indigo-400 prose-a:text-teal-500 prose-a:hover:text-teal-400">
      <div class="mx-8">
        <h1>Song Page</h1>
        <hr />
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
          <button v-for="category in categories" :key="category"
                  @click="filter = filter == category.abbr ? null : category.abbr" 
                   class="transition-colors duration-300 focus:ring ring-indigo-400 px-3 py-2 rounded text-sm font-medium"
                  :class="[ filter != null && filter != category.abbr ? 'bg-slate-400 text-white/50' : 'text-white bg-indigo-500']">{{ category.fullname }}</button>
        </div>
        
        <div v-if="filter != null"
             class="w-full mt-8 bg-slate-100">
          <h1 class="text-center p-5">{{ categories.filter(x => x.abbr == filter)[0].fullname }} PACK</h1>
        </div>
        <hr v-else />

        <div v-if="songs != null && categories != null">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div v-for="song in (filter == null ? songs : songs.filter(x => x.category == filter))" :key="song"
                class="bg-transparent">
              <div class="flex flex-nowrap w-full gap-4">
                <router-link :to="{ name:'SongDetail', params: { id: song.id } }"
                              class="flex-shrink-0 flex-grow-0">
                  <img :src="song.thumbnail_img" alt="Song Thumbnail Image" class="w-12 h-12 m-0 rounded-full shadow-md border-2 border-indigo-500 shadow-indigo-500/30"/>
                </router-link>

                <div class="flex flex-col flex-shrink flex-grow">
                  <p class="m-0 font-bold">{{ song.title }}</p>
                  <p class="m-0 text-sm text-slate-500">{{ song.composer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- loading animation w/ lottie -->
          <p>loading... will be replaced with lottie</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      songs: null,
      categories: null,
      filter: null,
    }
  },
  mounted() {
    axios
      .get("https://api.djmaxcloud.net/v01/songs")
      .then((res) => {
        this.songs = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://api.djmaxcloud.net/v01/songs/category")
      .then((res) => {
        this.categories = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>