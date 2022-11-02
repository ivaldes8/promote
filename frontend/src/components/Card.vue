<template>
  <q-card class="my-card">
    <q-img :src="imageUrl ?  imageUrl : 'logoOficial.png'" v-if="image" style="width: 300px;height: 300px;">
      <div class="text-h5 absolute-bottom" v-if="hasTitle && underImageTitle">
        {{ title }}
      </div>
    </q-img>

    <q-card-section v-if="hasTitle && !underImageTitle">
      <div class="text-h5">{{ title }}</div>
    </q-card-section>

    <q-separator inset v-if="hasDesc" />

    <q-card-section v-if="hasDesc">
      {{ desc }}
    </q-card-section>

    <q-separator inset v-if="hasActions" />

    <q-card-actions align="around" v-if="hasActions">
      <q-btn
        :color="action1Color"
        :icon-right="action1Icon"
        :label="$t(action1Title)"
        @click="$emit('update')"
      />
      <q-btn
        :color="action2Color"
        :icon-right="action2Icon"
        :label="$t(action2Title)"
        @click="$emit('delete')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CardCustom",
  props: {
    image: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "logoOficial.png",
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "title",
    },
    hasDesc: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      default: "desc",
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
      default: "edit",
    },
    action2Title: {
      type: String,
      default: "delete",
    },
    action1Icon: {
      type: String,
      default: "edit",
    },
    action2Icon: {
      type: String,
      default: "delete",
    },
    action1Color: {
      type: String,
      default: "primary",
    },
    action2Color: {
      type: String,
      default: "red",
    },
  },
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 300px
  max-width: 300px
</style>
