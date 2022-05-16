import {
  BuyBack,
} from '../generated/schema'
import {
  Buyback,
  ProposeAdmin,
  UpdateAdmin,
  UpdateTreasury,
} from '../generated/YfiBuyer/YfiBuyer'
import { createId, getOrCreateBuybackContract } from './utils'


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

export function handleProposedAdmin(event: ProposeAdmin): void {
  let contract = getOrCreateBuybackContract();

  contract.adminPending = event.params.pending_admin;
  contract.save();
}

export function handleUpdateAdmin(event: UpdateAdmin): void {
  let contract = getOrCreateBuybackContract();
  
  contract.admin = event.params.admin;
  contract.adminPending = null;
  contract.save();
}

export function handleUpdateTreasury(event: UpdateTreasury): void {
  let contract = getOrCreateBuybackContract();

  contract.treasury = event.params.treasury;
  contract.save();
}