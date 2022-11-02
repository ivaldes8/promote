<template>
  <div
    v-if="data.length > 0"
    class="q-pa-md row q-gutter-md"
    style="display: flex; justify-content: center; align-items: center"
  >
    <div v-for="card in data" :key="card.id ? card.id : card._id">
      <Card
        :image="image"
        :hasTitle="hasTitle"
        :underImageTitle="underImageTitle"
        :hasDesc="hasDesc"
        :hasActions="hasActions"
        :title="card[`${titleKey}`]"
        :desc="card[`${descKey}`]"
        :imageUrl="card[`${imageKey}`]"
        @update="$emit('update', card)"
        @delete="$emit('delete', card)"
      />
    </div>
  </div>
  <div v-if="data.length < 1">
    <NotFound :text="notFoundText" />
  </div>
</template>

<script>
import Card from "./Card.vue";
import NotFound from "./NotFound.vue";
export default {
  name: "CardList",
  props: {
    data: Array,
    notFoundText: {
      type: String,
      default: "notFound",
    },
    image: {
      type: Boolean,
      default: false,
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    hasDesc: {
      type: Boolean,
      default: false,
    },
    titleKey: String,
    descKey: String,
    imageKey: {
      type: String,
      default: "img",
    },
    underImageTitle: {
      type: Boolean,
      default: false,
    },
    hasActions: {
      type: Boolean,
      default: false,
    },
    action1Title: {
      type: String,
      default: "Edit",
    },
    action2Title: {
      type: String,
      default: "Delete",
    },
    action1Icon: {
      type: String,
      default: "Pencil",
    },
    action2Icon: {
      type: String,
      default: "Trash",
    },
  },
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
  components: { Card, NotFound },
};
</script>
