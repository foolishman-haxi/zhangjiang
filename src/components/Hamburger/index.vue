<template>
  <div style="padding: 0 15px;" @click="toggleClick">

    <svg :class="{ 'is-active': isActive }" class="hamburger" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path d="M44.4 245.9h935.2c24.4 0 44.4-20 44.4-44.4s-19.8-44.4-44.4-44.4H44.4C20 157.1 0 177.1 0 201.5s20 44.4 44.4 44.4z m935.2 221.8H44.4C20 467.7 0 487.7 0 512.1s20 44.4 44.4 44.4h935.2c24.4 0 44.4-20 44.4-44.4s-20-44.4-44.4-44.4z m0 310.4H44.4C20 778.1 0 797.8 0 822.5s20 44.4 44.4 44.4h935.2c24.4 0 44.4-19.8 44.4-44.4s-20-44.4-44.4-44.4z"></path>
    </svg>

  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
