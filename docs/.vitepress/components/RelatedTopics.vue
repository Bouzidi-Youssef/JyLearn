<template>
  <div v-if="items && items.length" class="related-topics">
    <h4>Related Topics</h4>
    <ul>
      <li v-for="item in items" :key="item.text">
        <a :href="item.link">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
