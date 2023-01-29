import React from 'react'

export const InlineBoxHeightTest: React.FC = () => {
  return (
    <div style={{background: 'gray',lineHeight: '50px', outline: 'blue'}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      灰色 div 的 line-height 为 50px
      <img style={{verticalAlign: 'middle'}} height={50} src={'/images/带刺玫瑰.jpg'} alt="emote"/>
      这张图片的高度为 50 px
    </div>
  )
}
