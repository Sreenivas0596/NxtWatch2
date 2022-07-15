import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import TrendingSection from './components/TrendingSection'
import GamingSection from './components/GamingSection'
import SavedVideosSection from './components/SavedVideosSection'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
    <ProtectedRoute exact path="/trending" component={TrendingSection} />
    <ProtectedRoute exact path="/gaming" component={GamingSection} />
    <ProtectedRoute exact path="/saved-videos" component={SavedVideosSection} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
