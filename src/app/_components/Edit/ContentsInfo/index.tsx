import React from 'react'
import ImageContainer from './ImagesContainer'
import VideoContainer from './VideoContainer'
import Accordion from '../../common/accordion/Accordion'
import MapContainer from './MapContainer'


export default function EditContents() {
  return (
    <div>
      <Accordion>
        <Accordion.Header >{'이미지'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="초대장에 넣고 싶은 이미지를 추가해보세요">
            <ImageContainer />
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
      <Accordion>
        <Accordion.Header >{'동영상'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="초대장에 넣고 싶은 동영상을 추가해보세요">
            <VideoContainer />
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
      <Accordion>
        <Accordion.Header >{'지도'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="일정이 열리는 위치를 추가해보세요">
            <MapContainer />
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
    </div>
  )
}
