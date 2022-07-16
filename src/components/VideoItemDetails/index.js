import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNowStrict} from 'date-fns'
import Header from '../Header'
import {
  ViewDataContainer,
  LikeDataContainer,
  LikeButton,
  LikeContainer,
  MainVideoItemContainer,
  ProfileImg,
  SubscriberContainer,
  FailureImg,
} from './styledComponents'

import './index.css'
import NxtWatchContext from '../../NxtWatchContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

const apiUrl = 'https://apis.ccbp.in/videos/'

class VideoItemDetails extends Component {
  state = {
    allVideoItemDetailsList: {},
    apiStatus: apiStatusConstants.initial,
    activeLikeButton: false,
    activeDislikeButton: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(`${apiUrl}${id}`, options)

    console.log(response)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const updateVideoItemDetailsList = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        viewCount: data.video_details.view_count,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
      }

      this.setState({
        allVideoItemDetailsList: updateVideoItemDetailsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({
      activeLikeButton: !prevState.activeLikeButton,
      activeDislikeButton: false,
    }))
  }

  onClickDislikeButton = () => {
    this.setState(prevState => ({
      activeDislikeButton: !prevState.activeDislikeButton,
      activeLikeButton: false,
    }))
  }

  renderNxtWatchAllVideoItemDetailsSuccessView = () => {
    const {
      allVideoItemDetailsList,
      activeLikeButton,
      activeDislikeButton,
    } = this.state

    console.log(allVideoItemDetailsList)

    const {
      title,
      description,

      videoUrl,
      viewCount,
      publishedAt,
      channel,
    } = allVideoItemDetailsList
    const {name, profileImageUrl, subscriberCount} = channel

    const activeLike = activeLikeButton ? 'active-like-button' : ''
    const activeDislike = activeDislikeButton ? 'active-like-button' : ''

    return (
      <NxtWatchContext.Consumer>
        return (
        <MainVideoItemContainer>
          <div>
            <ReactPlayer url={videoUrl} width="100%" />
            <h1>{title}</h1>
            <ViewDataContainer>
              <LikeContainer>
                <p>{viewCount} views </p>
                <BsDot />
                <p>{formatDistanceToNowStrict(new Date(publishedAt))}</p>
              </LikeContainer>
              <LikeDataContainer>
                <LikeButton
                  type="button"
                  className={activeLike}
                  onClick={this.onClickLikeButton}
                >
                  <LikeContainer>
                    <AiOutlineLike />
                    <p> Like </p>
                  </LikeContainer>
                </LikeButton>
                <LikeButton
                  type="button"
                  className={activeDislike}
                  onClick={this.onClickDislikeButton}
                >
                  <LikeContainer>
                    <AiOutlineDislike />
                    <p> Dislike </p>
                  </LikeContainer>
                </LikeButton>
                <LikeButton type="button">
                  <LikeContainer>
                    <MdPlaylistAdd />
                    <p> Save </p>
                  </LikeContainer>
                </LikeButton>
              </LikeDataContainer>
            </ViewDataContainer>
          </div>
          <hr />
          <SubscriberContainer>
            <div>
              <ProfileImg src={profileImageUrl} alt={name} />
            </div>
            <div>
              <h1>{name}</h1>
              <p>{subscriberCount} subscribers</p>
              <p>{description}</p>
            </div>
          </SubscriberContainer>
        </MainVideoItemContainer>
        )
      </NxtWatchContext.Consumer>
    )
  }

  renderNxtWatchFailureView = () => (
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

  renderVideoItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderNxtWatchAllVideoItemDetailsSuccessView()

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
        <div>{this.renderVideoItemDetails()}</div>
      </div>
    )
  }
}

export default VideoItemDetails
