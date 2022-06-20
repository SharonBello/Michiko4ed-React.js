import { HomePage } from './pages/homepage/homepage.jsx'
import { AppPage } from './pages/app-page/app-page.jsx'
import { SetDetails } from './pages/set-details/set-details.jsx'
import { LoginSignup } from './pages/login/login-signup.jsx'
import { AddSet } from './pages/add-set/add-set.jsx'
import { UserProfile } from './pages//user-profile/user-profile.jsx'

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
        path: '/add-set',
        component: <AddSet />
    },
    {
        path: '/set/:setId',
        component: <SetDetails />
    },
    {
        path: '/set',
        component: <AppPage />
    },
    {
        path: '/',
        component: <HomePage />
    },
]

export default routes