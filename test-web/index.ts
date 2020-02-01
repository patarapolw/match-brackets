import { FindBrackets } from '../src'

const elEditor = document.getElementById('editor') as HTMLTextAreaElement
const elOutput = document.getElementById('output') as HTMLDivElement

const fb = new FindBrackets('#{', '}')

elEditor.addEventListener('input', () => {
  elOutput.innerText = JSON.stringify(fb.parse(elEditor.value), null, 2)
})
