import {GamingImage, GameListContainer} from './styledComponents'

const GamingCard = props => {
  const {gameDetails} = props
  const {thumbnailUrl, title, viewCount} = gameDetails

  return (
    <GameListContainer>
      <GamingImage src={thumbnailUrl} alt="" />
      <h1>{title}</h1>
      <p>{viewCount} Watching Worldwide</p>
    </GameListContainer>
  )
}

export default GamingCard
