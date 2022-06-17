import { HomePage } from './pages/homepage.jsx'
import { GamePage } from './pages/game-page.jsx'
import { GameDetails } from './pages/game-details.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import { AddGame } from './pages/add-game.jsx'
import { UserProfile } from './pages/user-profile.jsx'

const routes = [
    {
        path: '/profile/:userId',
        component: <UserProfile />
    },
    {
        path: '/login',
        component: <LoginSignup />
    },
    {
        path: '/join',
        component: <LoginSignup />
    },
    {
        path: '/signup',
        component: <LoginSignup />
    },
    {
        path: '/add-game',
        component: <AddGame />
    },
    {
        path: '/game/:gameId',
        component: <GameDetails />
    },
    {
        path: '/games',
        component: <GamePage />
    },
    {
        path: '/',
        component: <HomePage />
    },
]

export default routes