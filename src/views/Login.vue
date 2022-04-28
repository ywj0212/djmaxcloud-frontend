<template>
  <div class="transition-colors duration-300 bg-white dark:bg-gray-900 h-full flex justify-center py-40 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 items-center">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="transition-colors duration-300 dark:text-white mt-6 text-center text-3xl font-extrabold text-gray-900">사이트 로그인</h2>
        <p class="transition-colors duration-300 mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          <a href="https://store.steampowered.com/" class="font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">스팀</a>으로 DJMAX Record의 기능을 이용해보세요!
        </p>
      </div>
      <img src="/sign_steam.png"
           class="relative w-3/5 mx-auto my-4 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  shadow-lg shadow-indigo-500/50"
           alt="Steam Login Button"
           @click="getAuthToken" />
    </div>
  </div>
</template>

<script>
const getCookie = function(name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};

export default {
  methods: {
    getAuthToken() {
      var token = getCookie("authtoken")

      if(token == null) {
        window.location.href = "https://api.djmaxcloud.net/auth/steam"
      }
      else {
        this.$router.push("/profile")
      }
    }
  },
  mounted() {
    if(getCookie("authtoken") != null) {
      this.$router.push("/profile")
    }
  }
}
</script>
