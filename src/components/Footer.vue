<script setup>
const items = [
  {
    title: 'cqqjlxy github',
    icon: `mdi-github`,
    href: 'https://github.com/cqqjlxy',
  },
]
</script>

<template>
  <v-footer height="75" app class="d-flex flex-column">
    <a class="icp" href="https://www.miit.gov.cn/" target="_blank">渝ICP备2024029328号</a>

    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      ref="noopener noreferrer"
      target="_blank"
  >
    <v-icon
        :icon="item.icon"
        :size="16"
    ></v-icon>
  </a>
    <div
        class="text-caption text-disabled"
    >
      © 2024 cqqjlxy
    </div>



  </v-footer>

</template>

<style scoped>
.icp {
  font-size: 12px;
  color: darkgray;
  text-decoration: none;
}

.icp:hover {
  color: black;
}
</style>
<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: black
</style>