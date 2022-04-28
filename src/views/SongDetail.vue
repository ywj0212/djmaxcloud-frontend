<template>
  <div class="transition-colors duration-300 h-full bg-white dark:bg-slate-900">
    <div class="transition-colors duration-300 mx-auto py-10 prose max-w-4xl prose-slate dark:prose-invert prose-headings:text-indigo-500 dark:prose-headings:text-indigo-400 prose-a:text-teal-500 prose-a:hover:text-teal-400">
      <div class="mx-8">
        <router-link :to="{ name:'Songs' }">&larr; 곡 목록으로 되돌아가기</router-link>
        <hr />
        <div v-if="song != null && patterns != null">
          <div class="flex flex-wrap space-x-6 w-full">
            <img :src="song.thumbnail_img" alt="Song Thumbnail Image" class="w-24 h-24 border-4 border-indigo-500 m-0" />
            <div class="flex flex-col flex-grow">
              <h2 class="mt-4 mb-2">{{ song.title }}</h2>
              <p class="m-0 my-1">{{ song.composer }}</p>
              <hr class="m-0 my-1 w-full" />
              <div class="flex flex-row space-x-6">
                <p class="m-0 my-1">BPM {{ (song.min_bpm == song.max_bpm) ? song.min_bpm : song.min_bpm + " ~ " + song.max_bpm }}</p>
                <p class="m-0 my-1">곡 길이 {{ formatTime(song.duration) }}</p>
                <a v-if="song.bga_url != ''" :href="song.bga_url" target="_blank">
                  <font-awesome-icon icon="link" class="align-bottom" />
                </a>
                <a v-if="song.hidden_bga_url != ''" :href="song.hidden_bga_url" target="_blank">
                  <font-awesome-icon icon="link" class="align-bottom" />
                </a>
                <p class="m-0 my-1" v-if="song.copyright">&copy;</p>
              </div>
            </div>
          </div>

          <hr />
          <p>Category: {{ song.category }}</p>
          <hr />
          <p>Lyric: {{ song.lyric }}</p>
          <hr />
          <p>패턴 목록은 여기에 넣어라</p>

        </div>
        <div v-else>
          <!-- loading animation w/ lottie -->
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
      song: null,
      patterns: null,
    }
  },
  methods: {
    formatTime(seconds) {
      var min = parseInt(seconds/60) < 10 ? '0'+ parseInt(seconds/60) : parseInt(seconds/60);
      var sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;

      return min + ":" + sec;
    }
  },
  mounted() {
    axios
      .get(`https://api.djmaxcloud.net/v01/songs/${this.$route.params.id}`)
      .then((res) => {
        this.song = res.data
      })
      .catch((error) => {
        console.log(error);
      });
    
    axios
      .get("https://api.djmaxcloud.net/v01/patterns")
      .then((res) => {
        this.patterns = res.data
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>