import {BsDot} from 'react-icons/bs'
import {
  LikeContainer,
  TrendingContainer,
  TrendingImage,
} from './styledComponents'

const TrendingCard = props => {
  const {trendingDetails} = props
  const {title, thumbnailUrl, channel, viewCount, publishedAt} = trendingDetails
  const {name} = channel
  return (
    <TrendingContainer>
      <TrendingImage src={thumbnailUrl} alt="" />
      <div>
        <h1>{title}</h1>
        <p>{name}</p>
        <LikeContainer>
          <p>{viewCount} views</p>
          <BsDot />
          <p>{publishedAt}</p>
        </LikeContainer>
      </div>
    </TrendingContainer>
  )
}

export default TrendingCard
