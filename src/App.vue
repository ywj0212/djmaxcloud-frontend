<template>
  <!-- Testing API -->
  <ul v-if="songs != null && patterns != null">
    <li v-for="song in songs" :key="song">
      <p>({{ song.id }}) {{ song.title }} - {{ song.composer }}</p>
      <img v-bind:src="song.thumbnail_img">
      <img v-bind:src="song.preview_img">
      <img v-bind:src="song.loading_img">
      
      <p v-if="song.min_bpm == song.max_bpm">BPM : {{ song.min_bpm }} | {{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 }}</p>
      <p v-else>BPM : {{ song.min_bpm }} ~ {{ song.max_bpm }} | {{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 }}</p>

      <ul>
        <li v-for="pattern in patterns.filter(x => x.song_id === song.id)" :key="pattern">
          {{pattern.id}} >> {{pattern.button}} {{pattern.difficulty}} ({{pattern.level}})
        </li>
      </ul>
      <hr>
    </li>
  </ul>
  <p>:)</p>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      songs: null,
      patterns: null
    }
  },
  mounted() {
    axios.get("https://api.mirix.kr/v01/songs")
    .then(response => (this.songs = response.data))
    .catch(function (error) {
      console.log(error);
    });
    axios.get("https://api.mirix.kr/v01/patterns")
    .then(response => (this.patterns = response.data))
    .catch(function (error) {
      console.log(error);
    });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
