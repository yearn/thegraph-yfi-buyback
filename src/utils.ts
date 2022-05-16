import { BigInt, Bytes, dataSource, ethereum as eth } from '@graphprotocol/graph-ts'
import { BuyBackContract } from '../generated/schema'
import { YfiBuyer } from '../generated/YfiBuyer/YfiBuyer'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// make a derived ID from transaction hash and big number
export function createId(n: BigInt, tx: Bytes): String {
  return n.toHex() + '-' + tx.toHex()
}

export function getOrCreateBuybackContract(): BuyBackContract {
  let entity = BuyBackContract.load("1")

  if(entity) {
    return entity;
  } else {
    entity = new BuyBackContract("1");

    let contract = YfiBuyer.bind(dataSource.address());
    entity.admin = contract.admin();
    entity.treasury = contract.treasury();

    let pending = contract.pending_admin();
    if(pending.toHexString() == ZERO_ADDRESS){
      entity.adminPending = null;
    } else {
      entity.adminPending = pending;
    }
    entity.save();
    return entity;
  }
}