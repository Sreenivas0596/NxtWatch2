import styled from 'styled-components'

export const ListSideBarContainer = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const SideBarContainer = styled.div`
  height: 90vh;
  max-width: 300px;
  background-color: ${props => (props.isDarkTheme ? '#606060' : '')};
`

export const SnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`

export const FbContainer = styled.div`
  display: flex;
`
