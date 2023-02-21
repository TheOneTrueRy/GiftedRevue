<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-3">

    </div>
    <div class="col-9">
      <div class="row">
        <div v-for="gift in gifts" class="col-md-4 p-3">
          <div class="card h-100">
            <img :src="gift.url ? gift.url : 'https://freepngimg.com/thumb/gift/27-gift-box-png-image.png'" alt="" height="" @click="openGift(gift.id)">
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
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { giftService } from "../services/GiftService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    async function getGifts(){
      try {
        await giftService.getGifts()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getGifts()
    })

    return {
      gifts: computed(() => AppState.gifts),
      async openGift(giftId){
        try {
          await giftService.openGift(giftId)
        } catch (error) {
          Pop.error(error.message)
          logger.log(error)
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
