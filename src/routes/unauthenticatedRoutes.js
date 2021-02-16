import Landing from '../components/pages/Landing/Landing';
import Signin from '../components/pages/Signin/Signin';
import Signup from '../components/pages/Signup/Signup';
import PasswordForgotten from '../components/pages/PasswordForgotten/PasswordForgotten';
import NotFound from '../components/pages/NotFound/NotFound';

const unauthenticatedRoutes = [
  {
    path: '/',
    components: Landing,
    exact: true,
  },
  {
    path: '/signin',
    components: Signin,
    exact: true,
  },
  {
    path: '/signup',
    components: Signup,
    exact: true,
  },
  {
    path: '/passwordforgotten',
    components: PasswordForgotten,
    exact: true,
  },
  {
    path: '*',
    components: NotFound,
  },
];

export default unauthenticatedRoutes;
