import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg',
        id: '1234',
        title: 'Meetup In Paris',
        date: '27th July 2019',
        location: 'Paris',
        description: 'Meet Us There'
      },
      { imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg',
        id: '1235',
        title: 'Meetup In London',
        date: '27th July 2019',
        location: 'London',
        description: 'Meet Us There'
      },
      { imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg',
        id: '1236',
        title: 'Meetup In Tokyo',
        date: '27th July 2019',
        location: 'Tokyo',
        description: 'Meet Us There'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setErrorStatus (state, payload) {
      state.error = payload
    },
    setLoadingStatus (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    loadedMeetups ({ commit }) {
      commit('setLoadingStatus', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imgUrl: obj[key].imgUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoadingStatus', false)
        })
        .catch(error => {
          commit('setLoadingStatus', false)
          console.log(error)
        })
    },
    async createMeetup ({ commit, getters }, payload) {
      const meetup = {
        // id: Math.floor(Math.random() * 888888) + '',
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let imgUrl
      let key
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then((key) => {
          const fileName = payload.image.name
          const ext = fileName.slice(fileName.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        // .then(
        //   fileData => {
        //     firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
        //       .then((url) => {
        //         return firebase.database().ref('meetups').child(key).update({ imgUrl: url })
        //       })
        //       .catch((error) => {
        //         console.error(error)
        //       })
        //   }
        // )
        .then(fileData => {
          return firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
        })
        .then((url) => {
          imgUrl = url
          return firebase.database().ref('meetups').child(key).update({ imgUrl: url })
        })
        .then(
          result => {
            commit('createMeetup', {
              ...meetup,
              id: key,
              imgUrl: imgUrl
            })
          }
        )
        .catch(error => {
          console.log(error)
        })
    },
    signUserUp ({ commit }, payload) {
      commit('setLoadingStatus', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoadingStatus', false)
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
            console.log('User Committed with id : ' + newUser.id)
          })
        .catch(err => {
          commit('setLoadingStatus', false)
          commit('setErrorStatus', err)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoadingStatus', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoadingStatus', false)
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
            console.log('User Signed with id : ' + newUser.id)
          })
        .catch(err => {
          commit('setLoadingStatus', false)
          commit('setErrorStatus', err)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: []
      })
    },
    signOut ({ commit }, payload) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({ commit }) {
      commit('setErrorStatus', null)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading_status (state) {
      return state.loading
    }
  }
})
