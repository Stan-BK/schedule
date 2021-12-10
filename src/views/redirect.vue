<template>
  <h1>redirect</h1>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.push({
        path: vm.$route.params.path,
      });
    });
  },
};
</script>
