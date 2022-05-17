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
import {
  Dai
} from '../generated/Dai/Dai'
import { createId } from './utils'
import { Address, BigInt } from '@graphprotocol/graph-ts'

const DAI_ADDRESS = Address.fromString("0x6B175474E89094C44Da98b954EedeAC495271d0F");
const BUYBACK_ADDRESS = Address.fromString("0xdf5e4E54d212F7a01cf94B3986f40933fcfF589F");


export function handleBuyback(event: Buyback): void {
  let id = createId(event.logIndex, event.transaction.hash)
  let buyback = new BuyBack(id.toString())

  let daiContract = Dai.bind(DAI_ADDRESS);
  buyback.daiRemaining = daiContract.balanceOf(BUYBACK_ADDRESS);
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
  let adminEntity = new Admin(event.transaction.hash.toHexString());

  adminEntity.address = event.params.admin;
  adminEntity.block = event.block.number;
  adminEntity.timestamp = event.block.timestamp;
  adminEntity.save();
}

export function handleUpdateTreasury(event: UpdateTreasury): void {
  let treasuryEntity = new Treasury(event.transaction.hash.toHexString());

  treasuryEntity.address = event.params.treasury;
  treasuryEntity.block = event.block.number;
  treasuryEntity.timestamp = event.block.timestamp;
  treasuryEntity.save();
}
