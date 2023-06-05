import 'core-js/stable'

import { getDate } from "./utils/date";
// import { fill } from 'lodash' // 有些库不能tree-shaking 通过这种方式才可以
import fill from "lodash/fill";
import $ from 'jquery'
import "./styles/common.css"
import "./styles/main.scss"


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

  let $div = document.createElement("div");
  $div.innerText = getDate();

  $div.style.color = "red";
  document.body.append($div);
}

bootstrap();

/**
 * 这里导出的东西会挂再到output.name上
 */
export default {
  bootstrap,
};
