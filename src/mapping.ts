import {
  BuyBack,
  Admin,
  Treasury
} from '../generated/schema'
import {
  Buyback,
  ProposeAdmin,
  UpdateAdmin,
  UpdateTreasury,
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

export function handleProposedAdmin(event: ProposeAdmin): void {
  /* null op */
}

export function handleUpdateAdmin(event: UpdateAdmin): void {
  let adminEntity = Admin.load("1");
  if(!adminEntity) {
    adminEntity = new Admin("1");
  }

  adminEntity.address = event.params.admin;
  adminEntity.block = event.block.number;
  adminEntity.timestamp = event.block.timestamp;
  adminEntity.hash = event.transaction.hash;
  adminEntity.save();
}

export function handleUpdateTreasury(event: UpdateTreasury): void {
  let treasuryEntity = Treasury.load("1");
  if(!treasuryEntity) {
    treasuryEntity = new Treasury("1");
  }

  treasuryEntity.address = event.params.treasury;
  treasuryEntity.block = event.block.number;
  treasuryEntity.timestamp = event.block.timestamp;
  treasuryEntity.hash = event.transaction.hash;
  treasuryEntity.save();
}