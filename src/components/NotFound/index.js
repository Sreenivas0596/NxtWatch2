import Header from '../Header'
import {NotFoundContainer, NotFoundImg} from './styledComponents'

const NotFound = () => (
  <div>
    <Header />
    <NotFoundContainer>
      <NotFoundImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt=""
      />
      <h1> Page Not Found</h1>
      <p> We are sorry, the page you requested could not be found </p>
    </NotFoundContainer>
  </div>
)

export default NotFound
