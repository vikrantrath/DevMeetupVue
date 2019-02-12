import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import authGuard from './auth-guard'
import Meetups from './components/Meetup/Meetups'
import CreateMeetup from './components/Meetup/CreateMeetup'
import Profile from './components/User/Profile'
import SignIn from './components/User/SignIn'
import SignUp from './components/User/SignUp'
import Meetup from './components/Meetup/Meetup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/createmeetup',
      name: 'CreateMeetups',
      component: CreateMeetup,
      beforeEnter: authGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'

})
