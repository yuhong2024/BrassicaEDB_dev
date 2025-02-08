<template>
  <div>
    <h3>API Response</h3>
    <pre>{{ resultData }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    resultData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
h3 {
  font-weight: bold;
}
</style>
