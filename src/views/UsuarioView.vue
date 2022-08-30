<template>
  <UsuarioComp/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import UsuarioComp from '@/components/UsuarioComp.vue';


export default defineComponent({
  name: 'UsuarioView',

  components: {
    UsuarioComp
},
});
</script>
