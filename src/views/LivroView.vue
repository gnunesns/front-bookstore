<template>
  <LivroComp/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import LivroComp from '@/components/LivroComp.vue';

export default defineComponent({
    components: {
         LivroComp
    }
});
</script>
