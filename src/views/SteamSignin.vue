<template>
  <div class="transition-colors duration-300 h-full bg-white dark:bg-slate-900">
    <div class="transition-colors duration-300 mx-auto py-10 prose max-w-4xl prose-slate dark:prose-invert prose-headings:text-indigo-500 dark:prose-headings:text-indigo-400 prose-a:text-teal-500 prose-a:hover:text-teal-400">
      <div class="mx-8">
        <h1 class="text-center">회원 약관 동의</h1>
        <div class="transition-colors duration-300 h-96 my-5 p-7 pr-9 overflow-x-hidden overflow-y-auto
                    scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-400 hover:dark:scrollbar-thumb-slate-600
                  bg-slate-100 dark:bg-slate-800 rounded-lg mx-auto">
          <Markdown :source="terms" />
        </div>
        <button @click="onAccept" class="bg-indigo-500 text-white w-full my-5 py-1 rounded-lg">동의하고 계속하기</button>
      </div>
    </div>
  </div>
  <link rel="preload" href="terms.md">
</template>

<script>
import axios from "axios";
import Markdown from 'vue3-markdown-it';
import terms from '../assets/terms.md'

const setCookie = function(cookie_name, value, days) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  let cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

export default {
  components: {
    Markdown
  },
  data() {
    return {
      terms: ''
    }
  },
  methods: {
    onAccept() {
      axios
        .get("https://api.djmaxcloud.net/auth/token", {
          withCredentials: true,
        })
        .then((res) => {
          setCookie("authtoken", res.data.jwt, 60);
          this.$emit("update");
          this.$router.push("/profile");
        })
        .catch((error) => {
          console.log(error);
          window.location.href = "https://api.djmaxcloud.net/auth/steam";
        });
    },
  },
  mounted() {
    this.terms = terms;
    // if(getCookie("authtoken") != null) {
    //   this.$router.push("/profile")
    // }
  }
};
</script>