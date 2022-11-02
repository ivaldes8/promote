<template>
    <q-card class="fullSize text-grey">
      <q-card-section class="">
        {{ $t(text) }}
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    text: {
      type: String,
      default: "notFound",
    },
  },
};
</script>
<style scoped>
.fullSize {
  width: 100%;
  text-align: center;
}
</style>
