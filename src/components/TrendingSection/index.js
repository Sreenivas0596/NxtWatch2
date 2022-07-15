import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import SideBar from '../SideBar'
import Header from '../Header'
import TrendingCard from '../TrendingCard'
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

class TrendingSection extends Component {
  state = {trendingVideosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/trending'

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

      const updateTrendingData = data.videos.map(eachTrend => ({
        id: eachTrend.id,
        publishedAt: eachTrend.published_at,
        thumbnailUrl: eachTrend.thumbnail_url,
        title: eachTrend.title,
        viewCount: eachTrend.view_count,
        channel: {
          name: eachTrend.channel.name,
          profileImageUrl: eachTrend.channel.profile_image_url,
        },
      }))

      this.setState({
        trendingVideosList: updateTrendingData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingSuccessView = () => {
    const {trendingVideosList} = this.state
    console.log(trendingVideosList)
    return (
      <div>
        <TrendingContainer>
          <HiFire />
          <h1> Trending </h1>
        </TrendingContainer>
        <ul>
          {trendingVideosList.map(eachTrend => (
            <TrendingCard key={eachTrend.id} trendingDetails={eachTrend} />
          ))}
        </ul>
      </div>
    )
  }

  renderTrendingFailureView = () => (
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

  renderTrendingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingSuccessView()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()

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
          <div>{this.renderTrendingVideos()}</div>
        </TrendingSectionContainer>
      </div>
    )
  }
}

export default TrendingSection
