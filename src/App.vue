<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list dense >
        <v-list-tile
        v-for="menuElement in menuItems" :key="menuElement.name"
        :to="menuElement.link">
          <v-list-tile-action>
            <v-icon>{{ menuElement.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ menuElement.name }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onSignOut">
          <v-list-tile-action >
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class='purple darken-4' >
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class='hidden-sm-and-up'></v-toolbar-side-icon>
      <v-toolbar-title dark> <router-link to="/" tag="span" style="cursor : pointer">Dev-Meetup</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class='hidden-xs-only' >
        <v-btn flat v-for="menuElement in menuItems" :key="menuElement.name" :to="menuElement.link"> <v-icon left >{{ menuElement.icon }}</v-icon>{{ menuElement.name }}</v-btn>
      </v-toolbar-items>
    <v-toolbar-items class='hidden-xs-only' v-if="userIsAuthenticated" >
        <v-btn flat @click="onSignOut"> <v-icon left >exit_to_app</v-icon>Sign Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content >
     <main>
     <router-view></router-view>
    </main>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', name: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', name: 'Sign In', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', name: 'View Meetups', link: '/meetups' },
          { icon: 'add_box', name: 'New Meetup', link: '/createmeetup' },
          { icon: 'person', name: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onSignOut () {
      this.$store.dispatch('signOut', this)
    }
  }
}
</script>
