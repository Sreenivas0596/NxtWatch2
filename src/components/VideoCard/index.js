import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'

import {
  ProfileImageContainer,
  ThumbnailUrlImg,
  ProfileImg,
  ViewDateContainer,
  VideoListContainer,
  ProfileHeading,
} from './styledComponents'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    title,
    thumbnailUrl,
    publishedAt,
    viewCount,
    channel,
    id,
  } = videoDetails

  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`} className="nav-link">
      <VideoListContainer>
        <ThumbnailUrlImg src={thumbnailUrl} alt={title} />

        <ProfileImageContainer>
          <div>
            <ProfileImg src={profileImageUrl} alt={name} />
          </div>
          <div>
            <ProfileHeading>{title}</ProfileHeading>

            <p>{name}</p>
            <ViewDateContainer>
              <p>{viewCount} views </p>
              <BsDot />
              <p>{formatDistanceToNow(new Date(publishedAt))}</p>
            </ViewDateContainer>
          </div>
        </ProfileImageContainer>
      </VideoListContainer>
    </Link>
  )
}

export default VideoCard
