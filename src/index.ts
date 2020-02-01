import escapeRegExp from 'escape-string-regexp'

export class FindBrackets {
  static escape = '\\'

  escapeKey: string
  regexMap: Record<'start' | 'end', RegExp>

  /**
   *
   * @param start Beginning bracket
   * @param end Ending bracket
   * @param options
   *  - [options.escape] Whether to be escape-able. Supply a string if you want a custom escape token.
   */
  constructor (
    private start: string,
    private end: string,
    options: {
      escape?: string | boolean
    } = {}
  ) {
    this.escapeKey = typeof options.escape === 'string'
      ? options.escape
      : (options.escape ? FindBrackets.escape : '')
    this.regexMap = {
      start: new RegExp(`${
        this.escapeKey ? `(?!${this.escapeKey})` : ''
      }${escapeRegExp(start)}`, 'g'),
      end: new RegExp(`${
        this.escapeKey ? `(?!${this.escapeKey})` : ''
      }${escapeRegExp(end)}`, 'g')
    }
  }

  parse (s: string, offset: number = 0) {
    const output: {
      value: string
      start: number
    }[] = []

    while (true) {
      let start = regexIndexOf(s, this.regexMap.start, offset)
      if (start === -1) {
        break
      }

      start += this.start.length
      offset = start + this.start.length

      const end = regexIndexOf(s, this.regexMap.end, offset)
      if (end === -1) {
        break
      }

      const value = strSegment(s, start, end)
      output.push({ value, start })

      offset = end + this.end.length
    }

    return output
  }
}

function regexIndexOf (src: string, q: RegExp, start: number = 0) {
  src = start ? src.substr(start) : src
  const i = src.search(q)
  return i === -1 ? i : i + start
}

function strSegment (src: string, start: number, end?: number) {
  return src.substr(start, end ? end - start : undefined)
}
