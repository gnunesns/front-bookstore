<template>
  <FooterComp/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import FooterComp from '../components/FooterComp.vue';


export default defineComponent({
  name: 'FooterView',

  components: {
      FooterComp
  },
});
</script>
 