import styled from 'styled-components'

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  font-family: 'Roboto';
  font-size: 24px;
`

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const LightDarkButton = styled.button`
  background-color: transparent;
  border-width: 0px;
`
export const LogoutButton = styled.button`
  border-width: 1px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  border-color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  height: 40px;
  width: 120px;
  margin-left: 10px;
  cursor: pointer;
  background-color: ${props => (props.isDarkTheme ? 'transparent' : '')};
`

export const ConfirmButton = styled.button`
  border-width: 1px;
  color: #ffffff;
  background-color: #3b82f6;
  height: 40px;
  width: 120px;
  margin-left: 10px;
  outline: none;
  border-radius: 10px;
  border-width: 0px;
  cursor: pointer;
`

export const ProfileImage = styled.img`
  width: 80px;
`

export const NxtWatchImage = styled.img`
  width: 200px;
  height: 80px;
`

export const CancelButton = styled.button`
  color: #64648b;
  border-color: #64648b;
  height: 40px;
  width: 120px;
  border-width: 1px;
  border-radius: 10px;
  cursor: pointer;
`

export const LogoutHeading = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b83f6')};
  font-size: 28px;
  text-align: center;
`

export const LogoutCard = styled.div`
  box-shadow: 1px 1px 1px 1px #ffffff;
  border: 10px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : null)};
  display: flex;
  align-items: center;
  padding: 50px;
`
