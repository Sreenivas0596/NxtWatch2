import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'

import {
  HeaderContainer,
  ProfileContainer,
  LightDarkButton,
  LogoutButton,
  ProfileImage,
  NxtWatchImage,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  return (
    <HeaderContainer>
      <div>
        <NxtWatchImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
      </div>
      <ProfileContainer>
        <LightDarkButton type="button">
          <FaMoon size={60} />
        </LightDarkButton>
        <ProfileImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />
        <Popup
          modal
          trigger={
            <LogoutButton type="button" className="trigger-button">
              Logout
            </LogoutButton>
          }
        >
          {close => (
            <>
              <div>
                <p> Are you sure you want to logout</p>
              </div>
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                cancel
              </button>
              <LogoutButton
                type="button"
                className="trigger-button"
                onClick={onClickLogout}
              >
                Confirm
              </LogoutButton>
            </>
          )}
        </Popup>
      </ProfileContainer>
    </HeaderContainer>
  )
}

export default withRouter(Header)
