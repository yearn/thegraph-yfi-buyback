import {
  BuyBack,
} from '../generated/schema'
import {
  Buyback,
} from '../generated/YfiBuyer/YfiBuyer'
import { createId } from './utils'


export function handleBuyback(event: Buyback): void {
  let id = createId(event.logIndex, event.transaction.hash)
  let buyback = new BuyBack(id.toString())

  buyback.block = event.block.number
  buyback.timestamp = event.block.timestamp
  buyback.seller = event.params.buyer
  buyback.dai= event.params.dai
  buyback.yfi= event.params.yfi

  buyback.save()
}
