export type retainerList = {
  name: string
  url: string
}

export type inBag = {
  itemName: string
  amount: number
}

export type retainerBagItems = {
  items: inBag[]
}

export interface retainerListResponseJson {
  data: retainerList[]
}

const storageKey = 'retainerList'
const inBagSuffixKey = '_bag'

export const setRetainerList = (retainersList: retainerList[]) => {
  localStorage.setItem(storageKey, JSON.stringify(retainersList))
}

/**
 * リテイナーリストをストレージから取り出す
 * @return {retainerList[]|null}
 */
export const getRetainerListFromStorage = (isJson = false) => {
  const storeItemsJson: string|null = localStorage.getItem(storageKey)
  if (storeItemsJson !== null) {
    if (isJson) {
      const storeItems = JSON.parse(storeItemsJson)
      const response: retainerListResponseJson = JSON.parse()
      return response
    } else {
      return storeItemsJson
    }
  }
  return null
}

/**
 * Save the contents of the retainer bag to local storage
 * @param retainerName
 * @param items
 */
export const setInBag = (retainerName: string, items: retainerBagItems) => {
  localStorage.setItem(retainerName + inBagSuffixKey, JSON.stringify(items))
}

export const getInBag = (retainerName: string) => {
  const storeItems: string|null = localStorage.getItem(retainerName + inBagSuffixKey)
  if (storeItems !== null) {
    return JSON.parse(storeItems)
  }
  return null
}