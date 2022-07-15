import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import {
  ViewDataContainer,
  LikeDataContainer,
  LikeButton,
  LikeContainer,
  MainVideoItemContainer,
  ProfileImg,
  SubscriberContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

const apiUrl = 'https://apis.ccbp.in/videos/'

class VideoItemDetails extends Component {
  state = {allVideoItemDetailsList: {}, apiStatus: apiStatusConstants.initial}

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
    }
  }

  renderNxtWatchAllVideoItemDetailsSuccessView = () => {
    const {allVideoItemDetailsList} = this.state

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

    return (
      <MainVideoItemContainer>
        <div>
          <ReactPlayer url={videoUrl} width="100%" />
          <h1>{title}</h1>
          <ViewDataContainer>
            <LikeContainer>
              <p>{viewCount} views </p>
              <BsDot />
              <p>{formatDistanceToNow(new Date(publishedAt))}</p>
            </LikeContainer>
            <LikeDataContainer>
              <LikeButton type="button">
                <LikeContainer>
                  <AiOutlineLike />
                  <p> Like </p>
                </LikeContainer>
              </LikeButton>
              <LikeButton type="button">
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
  }

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
