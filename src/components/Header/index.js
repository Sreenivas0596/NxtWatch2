import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {RiSunFill} from 'react-icons/ri'

import {
  HeaderContainer,
  ProfileContainer,
  LightDarkButton,
  LogoutButton,
  ProfileImage,
  NxtWatchImage,
  CancelButton,
  LogoutHeading,
  ConfirmButton,
  LogoutCard,
} from './styledComponents'
import NxtWatchContext from '../../NxtWatchContext'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, isDayTheme} = value

        const onClickDarkButton = () => {
          isDayTheme()
        }

        const darkNxtWatch = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const moonSunImg = isDarkTheme ? (
          <RiSunFill size={60} color="#ffffff" />
        ) : (
          <FaMoon size={60} />
        )

        return (
          <HeaderContainer isDarkTheme={isDarkTheme}>
            <div>
              <NxtWatchImage src={darkNxtWatch} alt="website logo" />
            </div>
            <ProfileContainer>
              <LightDarkButton type="button" onClick={onClickDarkButton}>
                {moonSunImg}
              </LightDarkButton>
              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LogoutButton
                    type="button"
                    className="trigger-button"
                    isDarkTheme={isDarkTheme}
                  >
                    Logout
                  </LogoutButton>
                }
              >
                {close => (
                  <LogoutCard isDarkTheme={isDarkTheme}>
                    <div>
                      <div>
                        <LogoutHeading isDarkTheme={isDarkTheme}>
                          {' '}
                          Are you sure you want to logout
                        </LogoutHeading>
                      </div>
                      <div>
                        <CancelButton
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          cancel
                        </CancelButton>
                        <ConfirmButton
                          type="button"
                          className="trigger-button"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </ConfirmButton>
                      </div>
                    </div>
                  </LogoutCard>
                )}
              </Popup>
            </ProfileContainer>
          </HeaderContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
