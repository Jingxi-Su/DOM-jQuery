// const api = jQuery(`.test`)//不返回elements，返回api对象
// api.addClass(`red`).addClass(`blue`).addClass(`green`)//链式操作，this就是.前面那个
jQuery(`.test0`).addClass(`red`).addClass(`blue`).addClass(`green`)//简写

jQuery(`.test1`).find(`.child`).addClass(`red`).addClass(`blue`).addClass(`green`).end().addClass(`yellow`)

const x = jQuery(`.test2`).find(`.child`)
x.each((div, number)=>{console.log(div, number)})

x.each((div)=>{console.log(div)})


const x1 = jQuery(`.child0`).parent()
x1.print()

jQuery(`.test`).children().print()
