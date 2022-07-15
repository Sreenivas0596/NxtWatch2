import styled from 'styled-components'

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
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
  color: #3b82f6;
  border-color: #3b82f6;
  height: 40px;
  width: 120px;
  margin-left: 10px;
`

export const ProfileImage = styled.img`
  width: 80px;
`

export const NxtWatchImage = styled.img`
  width: 200px;
  height: 80px;
`
