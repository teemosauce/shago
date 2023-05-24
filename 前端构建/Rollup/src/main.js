import { print } from "./utils/print";
import { getDate } from "./utils/date";
import fill from 'lodash/fill'

function bootstrap() {
    print(getDate())
    const a = new Array(10)
    fill(a, '喜')

    print(a)
}

bootstrap()

export const version = '1.0.0'