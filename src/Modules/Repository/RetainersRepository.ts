export type retainerList = {
  name: string
  url: string
}

const storageKey = 'retainerList'

export const setRetainerList = (retainersList: retainerList[]) => {
  localStorage.setItem(storageKey, JSON.stringify(retainersList))
}

/**
 * リテイナーリストをストレージから取り出す
 * @return {retainerList[]|null}
 */
export const getRetainerListFromStorage = () => {
  const storeItems: string|null = localStorage.getItem(storageKey)
  if (storeItems !== null) {
    return JSON.parse(storeItems)
  }
  return null
}

export type inBag = {
  itemName: string
  amount: number
}

export type retainerBagItems = {
  items: inBag[]
}

export const setInBag = (retainerName: string, items: retainerBagItems) => {
  localStorage.setItem(retainerName, JSON.stringify(items))
}
