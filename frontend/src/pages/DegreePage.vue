<template>
  <q-page >
    <h1>Degree</h1>

    <AdvancedInput/>
  </q-page>
</template>

<script>
import AdvancedInput from 'src/components/AdvancedInput.vue';


export default {
    name: "DegreePage",
    setup() {
        return {};
    },
    components: { AdvancedInput }
};
</script>
