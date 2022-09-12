import 'dotenv/load.ts'
import { fetchRetainerBagList, fetchRetainerList } from '../Service/RetainersService.ts'
import { getRetainerListFromStorage } from '../Repository/RetainersRepository.ts'
import { HandlerContext } from '$fresh/src/server/types.ts'

/**
 * リテイナーのリストをキャラクターページから取得する
 */
export const fetchRetainerListAction = (_req: Request, _ctx: HandlerContext, args) => {
  fetchRetainerList()
  return getRetainerListFromStorage(args)
}

/**
 * リテイナーバッグの中身を取得
 */
export const getRetainerBagAction = () => {
  // リテイナーバッグの中身を取得する
  fetchRetainerBagList()
  // ローカルストレージにリテイナー別にバッグの中身を格納する
}
