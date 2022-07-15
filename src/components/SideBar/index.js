import {Link} from 'react-router-dom'
import {VscHome} from 'react-icons/vsc'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'

import {
  ListSideBarContainer,
  SideBarContainer,
  SnsContainer,
  FbContainer,
} from './styledComponents'

const SideBar = () => (
  <SideBarContainer>
    <ul>
      <Link to="/" className="nav-link">
        <ListSideBarContainer>
          <VscHome size={40} />
          <h1>Home</h1>
        </ListSideBarContainer>
      </Link>
      <Link to="/trending" className="nav-link">
        <ListSideBarContainer>
          <HiFire size={40} />
          <h1>Trending</h1>
        </ListSideBarContainer>
      </Link>
      <Link to="/gaming" className="nav-link">
        <ListSideBarContainer>
          <SiYoutubegaming size={40} />
          <h1>Gaming</h1>
        </ListSideBarContainer>
      </Link>
      <Link to="/saved-videos" className="nav-link">
        <ListSideBarContainer>
          <MdPlaylistAdd size={40} />
          <h1> Saved Videos </h1>
        </ListSideBarContainer>
      </Link>
    </ul>
    <SnsContainer>
      <p> Contact Us</p>
      <FbContainer>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </FbContainer>
      <p>Enjoy ! Now to see your channels and recommendations!</p>
    </SnsContainer>
  </SideBarContainer>
)

export default SideBar
