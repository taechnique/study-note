<template>
  <div class="global-spinner-wrapper" :class="{ on : this.spinnerStore.isOn }">
    <div class="spinner-background">
      <div class="spinner-area">
        <flower-spinner
            :animation-duration="2500"
            :size="70"
            color="#0a66c2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { FlowerSpinner } from 'epic-spinners'
import { spinnerStore } from "@/store";

export default {
  data() {
    return {
      spinnerStore
    }
  },
  components: {
    FlowerSpinner
  }
}

</script>

<style lang="scss">
.global-spinner-wrapper {
  display: none;
  .spinner-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    /* this is what centers your element in the fixed wrapper*/
    display: flex;
    flex-flow: column nowrap;
    justify-content: center; /* aligns on vertical for column */
    align-items: center; /* aligns on horizontal for column */

    /* just for styling to see the limits */
    box-sizing: border-box;

  }

  &.on {
    display: block;
  }
}
</style>