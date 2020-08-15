import Search from './screens/Search'
import Profile from './screens/Profile'
import Gallery from './screens/Gallery'
import { Route } from './types'

const routes: Route[] = [
    {
        name: 'Search',
        component: Search
    },
    {
        name: 'Profile',
        component: Profile
    },
    {
        name: 'Gallery',
        component: Gallery
    }
]

export default routes
