import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import SideBar from '../SideBar'
import Header from '../Header'
import GamingCard from '../GamingCard'
import {
  TrendingContainer,
  TrendingSectionContainer,
  FailureImg,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class GamingSection extends Component {
  state = {gamingVideosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/gaming'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const updateGamingData = data.videos.map(eachGame => ({
        id: eachGame.id,

        thumbnailUrl: eachGame.thumbnail_url,
        title: eachGame.title,
        viewCount: eachGame.view_count,
      }))

      this.setState({
        gamingVideosList: updateGamingData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGamingSuccessView = () => {
    const {gamingVideosList} = this.state
    console.log(gamingVideosList)
    return (
      <div>
        <ul>
          {gamingVideosList.map(eachGame => (
            <GamingCard key={eachGame.id} gameDetails={eachGame} />
          ))}
        </ul>
      </div>
    )
  }

  renderGamingFailureView = () => (
    <div className="failure-container">
      <FailureImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1 className="job-title">Oops! Something went wrong</h1>
      <p className="address">
        We are having some trouble to complete your request.Please try again
      </p>
      <div>
        <button type="button" className="button" onClick={this.getAllJobsData}>
          Retry
        </button>
      </div>
    </div>
  )

  renderGamingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingSuccessView()
      case apiStatusConstants.failure:
        return apiStatusConstants.failure()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <TrendingSectionContainer>
          <div>
            <SideBar />
          </div>
          <div>
            <TrendingContainer>
              <SiYoutubegaming />
              <h1> Gaming </h1>
            </TrendingContainer>
            {this.renderGamingVideos()}
          </div>
        </TrendingSectionContainer>
      </div>
    )
  }
}

export default GamingSection
