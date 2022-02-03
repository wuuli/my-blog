## Test

1. 测试一下哈
2. hhh


```javascript
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize, {defaultSchema} from './index.js'
import rehypeStringify from 'rehype-stringify'

main()

async function main() {
    const file = await unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeSanitize, {
            ...defaultSchema,
            attributes: {
                ...defaultSchema.attributes,
                code: [
                    ...(defaultSchema.attributes.code || []),
                    // List of all allowed languages:
                    ['className', 'language-js', 'language-css', 'language-md']
                ]
            }
        })
        .use(rehypeHighlight, {subset: false})
        .use(rehypeStringify)
        .process('<pre><code className="language-js">console.log(1)</code></pre>')

    console.log(String(file))
}
```

# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
