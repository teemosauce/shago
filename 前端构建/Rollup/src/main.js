import 'core-js/stable' // 引入所有稳定版的实现
import 'core-js/modules/esnext.set.difference' // 引入提案版的 会发现在Set的原型上多了一个difference方法


// import 'core-js/modules/esnext.set.filter' // 引入提案版的 

import { getDate } from "./utils/";
// import { fill } from 'lodash' // 有些库不能tree-shaking 通过这种方式才可以
import fill from "lodash/fill";
import $ from 'jquery'
import "./styles/common.scss"
import "./styles/main.scss"


import './libs/flexible'

//
function bootstrap() {
  $(function() {
      const a = new Array(10)
      fill(a, '喜欢你')
      let $div = $(`<div class="div-txt"></div>`)
      $div.attr("id", "divText")
      console.log(getDate())
      $div.text(getDate() + "8888999999")
      $(document.body).append($div)
  })

  let $div = document.createElement("h1");
  $div.innerText = getDate();

  $div.style.color = "red";
  document.body.append($div);


  let aSet = new Set()
  let bSet = new Set()

  aSet.add(1)
  aSet.add(2)
  aSet.add(3)
  aSet.add(4)


  bSet.add(3)
  bSet.add(4)
  bSet.add(5)
  bSet.add(6)
  let diff = aSet.difference(bSet) // 该方法是JS next版本的方法 目前chrome还未实现
  console.log("diff", diff)
}

bootstrap();

/**
 * 这里导出的东西会挂再到output.name上
 */
export default {
  bootstrap,
};
