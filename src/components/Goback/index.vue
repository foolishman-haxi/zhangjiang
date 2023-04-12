<template>
  <el-page-header @back="goBack" class="title-text"> </el-page-header>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.title-text {
  font-weight: 700;
}
</style>
