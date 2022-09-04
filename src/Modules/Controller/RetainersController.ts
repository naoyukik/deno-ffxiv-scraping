import 'dotenv/load.ts'
import { fetchRetainerBagList, fetchRetainerList } from '../Service/RetainersService.ts'

/**
 * リテイナーのリストをキャラクターページから取得する
 */
export const fetchRetainerListAction = () => {
  fetchRetainerList()
}

/**
 * リテイナーバッグの中身を取得
 */
export const getRetainerBagAction = () => {
  // リテイナーバッグの中身を取得する
  fetchRetainerBagList()
  // ローカルストレージにリテイナー別にバッグの中身を格納する
}
