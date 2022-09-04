import 'dotenv/load.ts'

// import axiod from 'axiod';
// import { cheerio } from 'cheerio';
// import { RetainersController } from './Controller/RetainersController.ts'

//
// const url = 'https://news.google.com/search?q=technology&hl=ja&gl=JP&ceid=JP%3Aja'
//
// axiod.get(url).then(({data})=>{
//   const $ = cheerio.load(data)
//   const titles = $('.DY5T1d')
//   $(titles).each((index,element ) => {
//     const title = $(element)
//     console.log(`[${index+1}] : ${title.text()}`)
//   })
// })

// .env読み込み

import { fetchRetainerListAction, getRetainerBagAction } from './Modules/Controller/RetainersController.ts'

// fetchRetainerListAction();
getRetainerBagAction();
