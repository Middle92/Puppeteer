const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({
  headless: false
})
const page = await browser.newPage()

await page.setViewport({width: 1000, height: 800})
await page.goto('http://www.baidu.com')
// await page.screenshot({path: 'baidu.png'}) // 截图
const result = await page.evaluate(() => {
  return new Promise((resolve) => {
    $('#kw').val('明星')
    let arr = []
    $('#form').submit(() => {
      let timer = null
      timer = setInterval(() => {
        if($('.c-border .opui-page-next').length > 0) {
          clearInterval(timer)

          $('.c-border .opui-page-next').click(() => {
            $('.c-border p.c-gap-top-small > a').each((i, item) => {
              arr.push({
                name: $(item).attr('title'),
                href: 'https://baike.baidu.com/item/' + $(item).attr('title'),
              })
            })
          })
          
          let timer2 = null
          timer2 = setInterval(() => {
            const isClickButton = !(arr.map(item => item.name).join("").includes($('p.c-gap-top-small > a').text()))
            if(isClickButton) { //  && arr.length < 10
              $('.c-border .opui-page-next').click()
            } else if($('.c-border .opui-page-next').is(':hidden')) { // $('.c-border .opui-page-next').is(':hidden') || arr.length >= 10
              clearInterval(timer2)
              resolve(arr)
            }
          }, 100)
        }
      })
    })
    $('#form').submit()
  })
})