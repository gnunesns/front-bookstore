<template>
  <AluguelComp/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import AluguelComp from '@/components/AluguelComp.vue';

export default defineComponent({
  name: 'AluguelView',
  components: {
    AluguelComp
    }
});
</script>
