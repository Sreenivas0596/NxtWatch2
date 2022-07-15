import {Component} from 'react'

import Header from '../Header'
import SideBar from '../SideBar'
import {SaveVideoContainer} from './styledComponents'

class SavedVideosSection extends Component {
  render() {
    return (
      <div>
        <Header />
        <SaveVideoContainer>
          <div>
            <SideBar />
          </div>
          <div>
            <h1> Hiiii </h1>
          </div>
        </SaveVideoContainer>
      </div>
    )
  }
}

export default SavedVideosSection
