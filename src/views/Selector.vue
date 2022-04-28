<template>
  <div class="transition-colors duration-300 h-full bg-white dark:bg-slate-900">
    <div class="transition-colors duration-300 mx-auto py-10 prose max-w-4xl prose-slate dark:prose-invert prose-headings:text-indigo-500 dark:prose-headings:text-indigo-400 prose-a:text-teal-500 prose-a:hover:text-teal-400">
      <div class="mx-8">
        <h1>Random Selector Page</h1>
        
        <hr />
        
        <div class="grid grid-cols-4 gap-1">
          <button v-for="button in ['4B', '5B', '6B', '8B']" :key="button"
                  @click="toggleButtonFilter(button)" 
                   class="transition-colors duration-300 focus:ring ring-indigo-400 px-3 py-2 rounded text-sm font-medium"
                  :class="[ buttonFilter.includes(button) ? 'text-white bg-indigo-500 hover:bg-indigo-400' : 'bg-slate-400 hover:bg-slate-300 text-white/50']">{{ button }}</button>
        </div>

        <hr />
        
        <div class="grid grid-cols-4 gap-1">
          <button v-for="difficulty in ['NM', 'HD', 'MX', 'SC']" :key="difficulty"
                  @click="toggleDifficultyFilter(difficulty)" 
                   class="transition-colors duration-300 focus:ring ring-indigo-400 px-3 py-2 rounded text-sm font-medium"
                  :class="[ difficultyFilter.includes(difficulty) ? 'text-white bg-indigo-500 hover:bg-indigo-400' : 'bg-slate-400 hover:bg-slate-300 text-white/50']">{{ difficulty }}</button>
        </div>

        <hr />

        <div class="flex flex-row">
          <img @click="toggleLevelFilter(i)" v-for="i in 5" :key="i" :src="levelFilter.includes(i) ? '/levelStar/levelStar2.png' : '/levelStar/levelStar1.png'" />
          <img @click="toggleLevelFilter(i+5)" v-for="i in 5" :key="i" :src="levelFilter.includes(i+5) ? '/levelStar/levelStar3.png' : '/levelStar/levelStar1.png'" />
          <img @click="toggleLevelFilter(i+10)" v-for="i in 5" :key="i" :src="levelFilter.includes(i+10) ? '/levelStar/levelStar4.png' : '/levelStar/levelStar1.png'" />
        </div>

        <hr />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
          <button v-for="category in categories" :key="category"
                  @click="toggleCategoryFilter(category.abbr)" 
                   class="transition-colors duration-300 focus:ring ring-indigo-400 px-3 py-2 rounded text-sm font-medium"
                  :class="[ categoryFilter.includes(category.abbr) ? 'text-white bg-indigo-500 hover:bg-indigo-400' : 'bg-slate-400 hover:bg-slate-300 text-white/50']">{{ category.fullname }}</button>
        </div>

        <hr />

        <p>slider here</p>
        
        <button @click="getRandom" class="transition-colors duration-300 focus:ring ring-indigo-400 px-3 py-2 w-full rounded text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400">START</button>

        <p>{{ randomResult }}</p>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default {
  data() {
    return {
      songs: [],
      patterns: [],
      categories: [],

      buttonFilter: ['4B', '5B', '6B', '8B'],
      difficultyFilter: ['NM', 'HD', 'MX', 'SC'],
      categoryFilter: [],
      levelFilter:[],
      count: 1,

      //* display *//
      randomResult: []
    }
  },
  methods: {
    getRandom() {
      let filtered = this.patterns.filter(x => this.buttonFilter.includes(x.button) && this.difficultyFilter.includes(x.difficulty) && this.levelFilter.includes(x.level));
      filtered = filtered.filter(x => this.categoryFilter.includes(this.songs.find(y => y.id == x.song_id).category));
      this.randomResult = shuffle(filtered).slice(0, this.count);
    },

    toggleButtonFilter(button) {
      if(this.buttonFilter.includes(button)) {
        const index = this.buttonFilter.indexOf(button)
        this.buttonFilter.splice(index, 1);
      }
      else
        this.buttonFilter.push(button)
    },
    toggleDifficultyFilter(difficulty) {
      if(this.difficultyFilter.includes(difficulty)) {
        const index = this.difficultyFilter.indexOf(difficulty)
        this.difficultyFilter.splice(index, 1);
      }
      else
        this.difficultyFilter.push(difficulty)
    },
    toggleLevelFilter(level) {
      if(this.levelFilter.includes(level)) {
        const index = this.levelFilter.indexOf(level)
        this.levelFilter.splice(index, 1);
      }
      else
        this.levelFilter.push(level)
    },
    toggleCategoryFilter(category) {
      if(this.categoryFilter.includes(category)) {
        const index = this.categoryFilter.indexOf(category)
        this.categoryFilter.splice(index, 1);
      }
      else
        this.categoryFilter.push(category)
    },
  },
  mounted() {
    for(let i = 1; i <= 15; i++) {
      this.levelFilter.push(i);
    }

    axios
      .get("https://api.djmaxcloud.net/v01/songs")
      .then((res) => {
        this.songs = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://api.djmaxcloud.net/v01/patterns")
      .then((res) => {
        this.patterns = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://api.djmaxcloud.net/v01/songs/category")
      .then((res) => {
        this.categories = res.data;
        this.categories.forEach(element => {
          this.categoryFilter.push(element.abbr)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>