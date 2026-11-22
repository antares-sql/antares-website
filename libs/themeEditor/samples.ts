/**
 * Code shown in the simulated editors. Markup: ⟦key|text⟧ where key is a syntax token
 * (keyword, string, ...) or an editor marker (sel, match, bracket, ws, cursor), joined with "+".
 */

export interface CodeSample {
  language: string
  /** 0-based index of the line with the cursor */
  activeLine: number
  lines: string[]
}

export const sqlSample: CodeSample = {
  language: 'SQL',
  activeLine: 4,
  lines: [
    '⟦comment|-- Rock albums by number of tracks⟧',
    '⟦keyword|SELECT⟧ ⟦variable|a⟧⟦punctuation|.⟧⟦property|AlbumId⟧⟦punctuation|,⟧ ⟦variable|a⟧⟦punctuation|.⟧⟦sel+property|Title⟧⟦punctuation|,⟧ ⟦builtin|COUNT⟧⟦punctuation|(⟧⟦variable|t⟧⟦punctuation|.⟧⟦property|TrackId⟧⟦punctuation|)⟧ ⟦keyword|AS⟧ ⟦variable|Tracks⟧⟦punctuation|,⟧',
    '   ⟦builtin|CAST⟧⟦punctuation|(⟧⟦builtin|SUM⟧⟦punctuation|(⟧⟦variable|t⟧⟦punctuation|.⟧⟦property|Milliseconds⟧⟦punctuation|)⟧ ⟦operator|/⟧ ⟦number|60000.0⟧ ⟦keyword|AS⟧ ⟦type|DECIMAL⟧⟦punctuation|(⟧⟦number|8⟧⟦punctuation|,⟧ ⟦number|2⟧⟦punctuation|))⟧ ⟦keyword|AS⟧ ⟦variable|Minutes⟧',
    '⟦keyword|FROM⟧ ⟦variable|albums⟧ ⟦variable|a⟧',
    '⟦keyword|JOIN⟧ ⟦variable|tracks⟧ ⟦variable|t⟧ ⟦keyword|ON⟧ ⟦variable|t⟧⟦punctuation|.⟧⟦property|AlbumId⟧ ⟦operator|=⟧ ⟦variable|a⟧⟦punctuation|.⟧⟦property|AlbumId⟧⟦cursor|⟧',
    '⟦keyword|WHERE⟧ ⟦variable|a⟧⟦punctuation|.⟧⟦match+property|Title⟧ ⟦keyword|LIKE⟧ ⟦string|\'%Rock%\'⟧ ⟦keyword|AND⟧ ⟦variable|t⟧⟦punctuation|.⟧⟦property|Composer⟧ ⟦keyword|IS NOT⟧ ⟦atom|NULL⟧',
    '⟦keyword|GROUP BY⟧ ⟦variable|a⟧⟦punctuation|.⟧⟦property|AlbumId⟧',
    '⟦keyword|HAVING⟧ ⟦builtin|COUNT⟧⟦bracket+punctuation|(⟧⟦operator|*⟧⟦bracket+punctuation|)⟧ ⟦operator|>⟧ ⟦number|5⟧ ⟦keyword|AND⟧ ⟦builtin|MAX⟧⟦punctuation|(⟧⟦property|Bytes⟧⟦punctuation|)⟧ ⟦operator|<⟧ ⟦number|1e9⟧',
    '⟦keyword|ORDER BY⟧ ⟦variable|Tracks⟧ ⟦keyword|DESC⟧',
    '⟦keyword|LIMIT⟧ ⟦number|10⟧⟦punctuation|;⟧⟦ws|··⟧'
  ]
}

export const textSamples: Record<string, CodeSample> = {
  markdown: {
    language: 'Markdown',
    activeLine: 2,
    lines: [
      '⟦heading|# Release notes⟧',
      '',
      'Albums are now ⟦emphasis|*sorted*⟧ by ⟦strong|**track count**⟧.⟦cursor|⟧',
      '',
      '⟦list|-⟧ Run ⟦monospace|`npm run build`⟧ first',
      '⟦list|-⟧ See the ⟦link|[docs](https://antares-sql.app)⟧',
      '',
      '⟦quote|> Backup the database before upgrading⟧'
    ]
  },
  html: {
    language: 'HTML',
    activeLine: 3,
    lines: [
      '⟦meta|<!DOCTYPE html>⟧',
      '⟦tagPunctuation|<⟧⟦tag|div⟧ ⟦attribute|class⟧⟦operator|=⟧⟦attributeValue|"album"⟧ ⟦attribute|data-id⟧⟦operator|=⟧⟦attributeValue|"213"⟧⟦tagPunctuation|>⟧',
      '  ⟦comment|<!-- cover and title -->⟧',
      '  ⟦tagPunctuation|<⟧⟦tag|h2⟧⟦tagPunctuation|>⟧Pure Cult⟦tagPunctuation|</⟧⟦tag|h2⟧⟦tagPunctuation|>⟧⟦cursor|⟧',
      '  ⟦tagPunctuation|<⟧⟦tag|img⟧ ⟦attribute|src⟧⟦operator|=⟧⟦attributeValue|"cover.png"⟧ ⟦tagPunctuation|/>⟧',
      '⟦tagPunctuation|</⟧⟦tag|div⟧⟦tagPunctuation|>⟧'
    ]
  },
  json: {
    language: 'JSON',
    activeLine: 2,
    lines: [
      '⟦punctuation|{⟧',
      '  ⟦property|"title"⟧⟦punctuation|:⟧ ⟦string|"Pure Cult"⟧⟦punctuation|,⟧',
      '  ⟦property|"tracks"⟧⟦punctuation|:⟧ ⟦number|18⟧⟦punctuation|,⟧⟦cursor|⟧',
      '  ⟦property|"explicit"⟧⟦punctuation|:⟧ ⟦atom|false⟧⟦punctuation|,⟧',
      '  ⟦property|"genres"⟧⟦punctuation|:⟧ ⟦punctuation|[⟧⟦string|"rock"⟧⟦punctuation|,⟧ ⟦string|"goth"⟧⟦punctuation|]⟧⟦invalid|,⟧',
      '⟦punctuation|}⟧'
    ]
  }
}

/** Syntax tokens shown by each sample, to bring the right one on screen */
export const sampleOfSyntax = (key: string): string => {
  if (sqlSample.lines.some(l => l.includes(`⟦${key}|`) || l.includes(`+${key}|`))) { return 'sql' }
  for (const [name, sample] of Object.entries(textSamples)) {
    if (sample.lines.some(l => l.includes(`⟦${key}|`) || l.includes(`+${key}|`))) { return name }
  }
  return 'sql'
}

export interface CodePiece { keys: string[], text: string }

export const parseLine = (line: string): CodePiece[] => {
  const out: CodePiece[] = []
  const re = /⟦([\w+]+)\|([^⟧]*)⟧/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    if (m.index > last) { out.push({ keys: [], text: line.slice(last, m.index) }) }
    out.push({ keys: m[1].split('+'), text: m[2] })
    last = re.lastIndex
  }
  if (last < line.length) { out.push({ keys: [], text: line.slice(last) }) }
  return out
}
