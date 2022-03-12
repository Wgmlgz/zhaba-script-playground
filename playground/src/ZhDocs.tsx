import { List, ListItem, ListItemText } from '@mui/material'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import showdown from 'showdown'
import { ControlledEditor } from '@monaco-editor/react'
import HtmlParser from 'react-html-parser'

const converter = new showdown.Converter({ tables: true })

interface IChapter {
  name: string
  content: ReactNode
}

function recursiveMap(children: any, fn: any) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    if (typeof child.type === 'function') {
      // @ts-ignore
      child = child.type()
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn),
      })
    }

    return fn(child)
  })
}

const TitlesList = (props: any) => {
  return (
    <div className='titles-list'>
      {recursiveMap(props.children, (child: any) => {
        return child.type === 'code' &&
          child.props.className &&
          child.props.className.split(' ')[0] === 'zh' ? (
          <InlineCode code={child.props.children[0] ?? ''} />
        ) : (
          child
        )
      })}
    </div>
  )
}

const InlineCode: FC<{ code: string }> = ({ code }) => {
  const fontSize = 20
  return (
    <div
      onScrollCapture={() => {
        console.log('adfasd')
      }}
      onScroll={e => {
        console.log(e)
      }}>
      <ControlledEditor
        // width={'500px'}
        height={`${(code.split('\n').length) * (fontSize + 7)}px`}
        value={code}
        language='zh'
        options={{
          fontFamily: 'JetBrains Mono',
          fontSize,
          contextmenu: false,
          cursorSmoothCaretAnimation: true,
          cursorBlinking: 'phase',
          minimap: {
            enabled: false,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          wordWrap: true,
          readOnly: true,
          scrollbar: {
            vertical: 'hidden',
            handleMouseWheel: false,
          },
          scrollBeyondLastLine: false,
        }}
        theme={'one-dark-pro'}
      />
    </div>
  )
}
export const ZhDocs = () => {
  const [chapters, setChapters] = useState<IChapter[]>([])
  useEffect(() => {
    ;(async () => {
      const files = (
        await Promise.all(
          (
            await (
              await fetch(
                (
                  await (
                    await fetch(
                      'https://api.github.com/repos/wgmlgz/zhaba-script/git/trees/main'
                    )
                  ).json()
                ).tree.filter(({ path }: any) => path === 'docs')[0].url
              )
            ).json()
          ).tree
            .filter(
              ({ path }: { path: string }) => path.split('.').at(-1) === 'md'
            )
            .map(async ({ path, url }: { path: string; url: string }) => {
              let content = (
                <TitlesList>
                  <div>
                    {HtmlParser(
                      converter.makeHtml(
                        (
                          await (
                            await fetch(
                              `https://raw.githubusercontent.com/Wgmlgz/zhaba-script/main/docs/${path}`
                            )
                          ).text()
                        ).trim() || '# No content here yet ('
                      )
                    )}
                  </div>
                </TitlesList>
              )

              return {
                name: path
                  .split('.')[0]
                  .replaceAll('_', ' ')
                  .replaceAll('-', ' '),
                content,
              }
            })
        )
      ).sort(
        (a, b) => Number(a.name.split(' ')[0]) - Number(b.name.split(' ')[0])
      )
      setChapters(files)
      console.log(files)
    })()
  }, [])
  const url = new URL(window.location.href)
  const chapter = Number(url.searchParams.get('chapter')) ?? 0
  const [selected, setSelected] = useState(chapter)
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            minWidth: '300px',
            height: 'calc(100vh)',
            overflowY: 'scroll',
          }}>
          <List>
            {chapters.map(({ content, name }, index) => (
              <ListItem
                button
                onClick={() => {
                  setSelected(index)
                  url.searchParams.set('chapter', String(index))
                  window.history.pushState(null, 'Title', url.href)
                }}
                key={index}
                selected={index === selected}>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
          <div style={{ height: '50vh' }} />
        </div>
        <div
          style={{
            height: 'calc(100vh)',
            overflowY: 'scroll',
            paddingLeft: '100px',
            paddingRight: '100px',
            width: '100%',
          }}>
          {chapters[selected]?.content}

          <div style={{ height: '50vh' }} />
        </div>
      </div>
    </div>
  )
}
