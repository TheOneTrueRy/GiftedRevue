<template>
<div class="container-fluid">
  <div class="row h-100">
    <div class="col-3 bg-success px-4">
      <form @submit.prevent="postGift()">
        <label class="mt-4 fs-5 fw-bold mb-1">Gift Description</label>
        <input v-model="form.tag" required type="text" class="form-control">
        <label class="mt-4 fs-5 fw-bold mb-1">IMG URL</label>
        <input v-model="form.url" required type="text" class="form-control">
        <button type="submit" class="btn btn-light btn-outline-dark mt-4">Post Gift!</button>
      </form>
    </div>
    <div class="col-9">
      <div class="row">
        <div v-for="gift in gifts" class="col-md-4 p-3">
          <div class="card h-100 elevation-1">
            <img :src="gift.url ? gift.url : 'https://i.gifer.com/origin/5a/5ac7f08c9c895bb0549dfbbbd79a7c52_w200.gif'" alt="" height="" @click="openGift(gift.id)">
            <div class="card-body">
              <span class="fs-5">{{ gift.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { giftService } from "../services/GiftService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const form = ref({})
    async function getGifts(){
      try {
        await giftService.getGifts()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getGifts()
    })

    return {
      form,
      gifts: computed(() => AppState.gifts),
      async openGift(giftId){
        try {
          await giftService.openGift(giftId)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
      async postGift(){
        try {
          let formData = form.value
          await giftService.postGift(formData)
          form.value = {}
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

img{
    height: 400px;
    width: auto;
    cursor: pointer;
}
</style>
