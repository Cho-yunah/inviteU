import React from 'react'
import ContentStep from './ContentStep/ContentStep'
import styles from './contents.module.scss'
import ImageContainer from './ImagesContainer'
import VideoContainer from './VideoContainer'

export default function EditContents() {
  return (
    <div>
      <ContentStep
        title="이미지"
        description="초대장에 넣고 싶은 이미지를 추가해보세요"
      >
        <ImageContainer />
      </ContentStep>
      <ContentStep
        title="동영상"
        description="초대장에 넣고 싶은 동영상을 추가해보세요"
      >
        <VideoContainer />
      </ContentStep>
      <ContentStep title="지도" description="일정이 열리는 위치를 추가해보세요">
        일정 추가
      </ContentStep>
    </div>
  )
}
