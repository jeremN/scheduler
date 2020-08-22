import Landing from '../components/pages/Landing/Landing';
import Home from '../components/pages/Home/Home';
import Team from '../components/pages/Team/Team';
import Plannings from '../components/pages/Plannings/Plannings';
import EditPlanning from '../components/pages/Plannings/Edit/Edit';
import Settings from '../components/pages/Settings/Settings';
import Signin from '../components/pages/Signin/Signin';
import Signup from '../components/pages/Signup/Signup';
import PasswordForgotten from '../components/pages/PasswordForgotten/PasswordForgotten';
import NotFound from '../components/pages/NotFound/NotFound';

const routes = [
  {
    path: '/',
    components: Landing,
    display: 'always',
    exact: true,
  },
  {
    path: '/home',
    components: Home,
    display: 'isAuth',
    exact: true,
  }, {
    path: '/team',
    components: Team,
    display: 'isAuth',
    exact: true,
  }, {
    path: '/plannings',
    components: Plannings,
    display: 'isAuth',
    exact: true,
  }, {
    path: '/plannings/edit/:id',
    components: EditPlanning,
    display: 'isAuth',
    exact: true,
  }, {
    path: '/settings',
    components: Settings,
    display: 'isAuth',
    exact: true,
  }, {
    path: '/signin',
    components: Signin,
    display: 'notAuth',
    exact: true,
  }, {
    path: '/signup',
    components: Signup,
    display: 'notAuth',
    exact: true,
  }, {
    path: '/passwordforgotten',
    components: PasswordForgotten,
    display: 'notAuth',
    exact: true,
  }, {
    path: '',
    components: NotFound,
    display: 'always',
  }, 
];

export default routes;