import Vue from 'vue'
import App from './App.vue'
import AlertComp from './components/Shared/Alert'
import './plugins/vuetify'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import appEditMeetupDialogue from './components/Meetup/Edit/EditMeetupDetailsDialogue'
import appEditMeetupDateDialogue from './components/Meetup/Edit/EditMeetupDateDialogue'
import appEditMeetupTimeDialogue from './components/Meetup/Edit/EditMeetupTimeDialogue'
import appRegisterDialogue from './components/Meetup/Registration/RegisterDialog'

Vue.config.productionTip = true
Vue.component('app-alert', AlertComp)
Vue.component('app-edit-meetup-dialog', appEditMeetupDialogue)
Vue.component('app-edit-meetup-date-dialog', appEditMeetupDateDialogue)
Vue.component('app-edit-meetup-time-dialog', appEditMeetupTimeDialogue)
Vue.component('app-register-dialog', appRegisterDialogue)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC8ivND0LZSzglhKfOfjFe3S7TUhMlIQAQ',
      authDomain: 'devmeetupyt.firebaseapp.com',
      databaseURL: 'https://devmeetupyt.firebaseio.com',
      projectId: 'devmeetupyt',
      storageBucket: 'gs://devmeetupyt.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadedMeetups')
  }
}).$mount('#app')
