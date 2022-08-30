<template>
  <EditoraComp/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import EditoraComp from '@/components/EditoraComp.vue';


export default defineComponent({
  name: 'EditoraView',

  components: {
    EditoraComp
},
});
</script>
