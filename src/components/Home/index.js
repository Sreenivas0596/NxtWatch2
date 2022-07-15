import {Component} from 'react'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import Header from '../Header'
import VideoCard from '../VideoCard'
import SideBar from '../SideBar'

import {HomeContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    allNxtWatchVideosList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getNxtWatchVideos()
  }

  getNxtWatchVideos = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const response = await fetch(url, options)

    console.log(response)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const updateNxtWatchData = data.videos.map(eachVideo => ({
        title: eachVideo.title,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
      }))
      this.setState({
        allNxtWatchVideosList: updateNxtWatchData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderNxtWatchAllVideoSuccessView = () => {
    const {allNxtWatchVideosList, searchInput} = this.state

    console.log(allNxtWatchVideosList)

    const {title} = allNxtWatchVideosList

    console.log(title)

    return (
      <div>
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeInput}
        />
        <ul>
          {allNxtWatchVideosList.map(eachVideo => (
            <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNxtWatchVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderNxtWatchAllVideoSuccessView()

      case apiStatusConstants.failure:
        return this.renderNxtWatchFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <HomeContainer>
          <div>
            <SideBar />
          </div>
          <div>{this.renderNxtWatchVideos()}</div>
        </HomeContainer>
      </div>
    )
  }
}

export default Home
