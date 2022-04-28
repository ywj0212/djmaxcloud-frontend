<script>
const getCookie = function(name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};
const setCookie = function(cookie_name, value, days) {
  let exdate = new Date(); exdate.setDate(exdate.getDate() + days);
  let cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
};
const delCookie = function(name){
  let date = new Date();
  date.setDate(date.getDate() - 100);
  let Cookie = `${name}=;Expires=${date.toUTCString()}`
  document.cookie = Cookie;
};

export default {
  data() {
    return {
      isDark: false,
      isMobileNav: false,
      isLogin: false,
    }
  },
  methods: {
    toggleTheme() {
      this.isDark ^= true;
      setCookie("theme", this.isDark ? "dark" : "light", Infinity)
    },
    toggleMobileNav() {
      this.isMobileNav ^= true;
    },
    init() {
      var theme = getCookie("theme");
      
      if(theme == "light") {
        this.isDark = false;
      }
      else if(theme == "dark") {
        this.isDark = true;
      }
      else {
        setCookie("theme", "light", Infinity)
      }

      this.isLogin = getCookie("authtoken") != null;
    },
    logout() {
      delCookie("authtoken");
      this.init();
      this.$router.push("/")
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<template>
<!-- This example requires Tailwind CSS v2.0+ -->
  <div class="scroll-smooth" :class="{'dark' : isDark}">
    <nav class="transition-colors duration-300 bg-slate-100 dark:bg-slate-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button @click="toggleMobileNav" type="button" class="transition-colors duration-300 dark:bg-slate-800 p-1 rounded-full dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 dark:focus:ring-white">
              <span class="sr-only">Open Mobile Navigation</span>
              <font-awesome-icon icon="bars" />
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <router-link to="/" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
                <router-link to="/about" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</router-link>
                <router-link to="/songs" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Songs</router-link>
                <router-link to="/selector" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Random Selector</router-link>
                <router-link to="/profile" v-if="isLogin" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</router-link>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center space-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- <button type="button" class="transition-colors duration-300 dark:bg-slate-800 p-1 rounded-full dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 dark:focus:ring-white">
              <span class="sr-only">View notifications</span>
              <font-awesome-icon icon="bell" />
            </button> -->
            <button type="button" @click="toggleTheme()" class="transition-colors duration-300 dark:bg-slate-800 p-1 rounded-full dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 dark:focus:ring-white">
              <span class="sr-only">Toggle Light/Dark Theme</span>
              <font-awesome-icon icon="sun" v-if="isDark" />
              <font-awesome-icon icon="moon" v-else />
            </button>
            <router-link to="/login" v-if="!isLogin" class="transition-colors duration-300 text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
            <button @click="logout" v-if="isLogin" class="transition-colors duration-300 text-indigo-600 dark:text-white bg-transparent hover:bg-indigo-500/10 dark:hover:bg-white/10 border-indigo-600 dark:border-white border px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </div>
        </div>
        <div v-if="isMobileNav" class="transition-transform ease-out duation-600 block space-y-3 py-3 sm:hidden sm:ml-6">
          <hr class="border-slate-400" />
          <div class="flex flex-col">
            <router-link to="/" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
            <router-link to="/about" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</router-link>
            <router-link to="/songs" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Songs</router-link>
            <router-link to="/profile" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</router-link>
            <router-link to="/selector" class="transition-colors duration-300 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Random Selector</router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view class="min-h-screen" @update="init" />
  </div>
</template>
