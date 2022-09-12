import 'dotenv/load.ts'

import axiod from 'axiod'
import { cheerio } from 'cheerio'
import {
  setRetainerList,
  retainerList as _retainerList,
  getRetainerListFromStorage, setInBag, retainerBagItems as _retainerBagItems, inBag, getInBag
} from '../Repository/RetainersRepository.ts'
import { IConfig } from 'https://deno.land/x/axiod@0.26.1/interfaces.ts'

const ROOT_URL = 'https://jp.finalfantasyxiv.com'
const LODESTONE_URL = '/lodestone'

const myCharacterEndpoint: string = ROOT_URL + LODESTONE_URL + '/character/' + Deno.env.get('MY_CHARACTER_ID')
// const retainersRepository: RetainersRepository = new RetainersRepository()

const getHeaderConfig = () => {
  const myCharacterLdstSess: string = Deno.env.get('MY_CHARACTER_LDST_SESS') || ""
  const cookies: string[] = [myCharacterLdstSess]
  return { headers: { 'Cookie': cookies.join(';') } }
}
const headers:IConfig = getHeaderConfig()


/**
 * リテイナーのリストをサイトより取得
 * 自分のログイン済みCookieを使用して自分のキャラクターページを取得する
 * @return {void}
 */
export const fetchRetainerList = async () => {
  // TODO: ストレージのキャッシュ期間を設定する
  // すでに取得していたら終了
  // const retainerList = this.retainersRepository.getRetainerList()
  // if (retainerList !== null && retainerList.length > 0) {
  //   console.log(retainerList.length)
  //   return
  // }

  // リテイナーリストへのアクセス
  await axiod.get(myCharacterEndpoint + '/retainer', headers)
    .then(({ data }) => {
      const $ = cheerio.load(data)
      const retainersDom = $('body > div.ldst__bg > div.ldst__contents.clearfix > div.ldst__main > div > div.retainer__data.js__toggle_wrapper > ul > li > a')
      const storageList: _retainerList[] = [];

      $(retainersDom).each((_: bigint, element: string) => {
        const domElement = $(element)
        storageList.push({
          name: domElement.text(),
          url: domElement.attr('href')
        })
      })
      // ローカルストレージにリテイナーリストを格納する
      setRetainerList(storageList)
    })
}

export const getRetainerList = (isJson = false) => {
  getRetainerListFromStorage(isJson)
}

/**
 * Retrieving the contents of the retainer's bag
 */
export const fetchRetainerBagList = async () => {
  const retainerListFromStorage = getRetainerListFromStorage()
  if (retainerListFromStorage !== null) {
    for (const retainerListFromStorageObject of retainerListFromStorage) {
      const { name, url } = retainerListFromStorageObject
      const retainerBagUrl = `${ROOT_URL}${url}baggage/`
      console.log(name)
      const retainerBagItems: inBag[] = [];
      await axiod.get(retainerBagUrl, headers)
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const retainerItemList = 'div.retainer__content.sys_retainer-content.active > ul.item-list--footer.sys_item_list > li'
          const bagDom = $(retainerItemList)
          for (const bagDomElement of bagDom) {
            const item: inBag = {
              itemName: bagDomElement.children["1"].children["0"].children["0"].children["0"].data,
              amount: bagDomElement.children["2"].children["0"].data
            }
            retainerBagItems.push(item)
          }
          setInBag(name, {items: retainerBagItems})
        }).catch((error) => {
          console.log('error: ' + error);
        })
      console.log(getInBag(name))
    }
  }
}
