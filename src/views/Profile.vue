<template>
  <div class="transition-colors duration-300 h-full bg-white dark:bg-slate-900">
    <div class="transition-colors duration-300 mx-auto py-10 prose max-w-4xl prose-slate dark:prose-invert prose-headings:text-indigo-500 dark:prose-headings:text-indigo-400 prose-a:text-teal-500 prose-a:hover:text-teal-400">
      <div class="mx-8">
        <h1>Profile Page</h1>
      </div>
      <!-- Display Profile View -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    if(getCookie("authtoken") == null) {
      this.$router.push("/login")
    }
  }
};
</script>