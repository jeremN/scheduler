import Home from '../components/pages/Home/Home';
import Team from '../components/pages/Team/Team';
import Teammate from '../components/pages/Team/Teammate/Teammate';
import Plannings from '../components/pages/Plannings/Plannings';
import EditPlanning from '../components/pages/Plannings/Edit/Edit';
import Settings from '../components/pages/Settings/Settings';
import NotFound from '../components/pages/NotFound/NotFound';

const authenticatedRoutes = [
  {
    path: '/home',
    components: Home,
    exact: true,
  },
  {
    path: '/team',
    components: Team,
    exact: true,
  },
  {
    path: '/team/:id/:memberId',
    components: Teammate,
    exact: true,
  },
  {
    path: '/plannings',
    components: Plannings,
    exact: true,
  },
  {
    path: '/plannings/edit/:id',
    components: EditPlanning,
    exact: true,
  },
  {
    path: '/settings',
    components: Settings,
    exact: true,
  },
  {
    path: '*',
    components: NotFound,
  },
];

export default authenticatedRoutes;
