import { getDate } from "./utils";

import './style/common.css'

import content from './what.abc'


function printDate() {
    console.log(getDate())
}

function run() {
    printDate()

    document.onreadystatechange = (ev) => {
        console.log(ev)
    }

    window.onload = (e) => {
        document.getElementById('title').addEventListener('click', (e) => {
            e.target.innerText = content
        })
    }

}

run()