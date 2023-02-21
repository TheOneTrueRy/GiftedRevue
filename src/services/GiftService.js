import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { sandboxApi } from "./AxiosService.js"


class GiftService{
async getGifts(){
  const res = await sandboxApi.get('gifts')
  logger.log(res.data)
  AppState.gifts = res.data.map(g => new Gift(g))
}

async openGift(giftId){
  const res = await sandboxApi.put(`gifts/${giftId}`, {opened: true})
}
}

export const giftService = new GiftService()