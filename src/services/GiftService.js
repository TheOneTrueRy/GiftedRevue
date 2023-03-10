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
  let giftIndex = AppState.gifts.findIndex(g => g.id == giftId)
  AppState.gifts.splice(giftIndex, 1, res.data)
  return res
}

async postGift(giftData){
  const res = await sandboxApi.post('gifts', giftData)
  AppState.gifts.unshift(new Gift(res.data))
}
}

export const giftService = new GiftService()