<template>
  <div id="layout">
    <slot/>
  </div>
</template>

<style lang="scss">
html, body, #__nuxt, #layout {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background-color: pink;
  color: white;
}
</style>