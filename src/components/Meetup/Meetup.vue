<template>
    <v-container>
     <v-layout row wrap v-if="loading ">
          <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                color="primary"
                :width=10
                :size=70
                v-if="loading"
              ></v-progress-circular>
          </v-flex>
      </v-layout>
       <v-layout row wrap>
           <v-flex xs12>
               <v-card>
                   <v-card-title class="justify-center">
                       <h1 >{{ meetUp.title }}</h1>
                       <template v-if="userIsCreator">
                           <v-spacer></v-spacer>
                           <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
                       </template>
                   </v-card-title>
                   <v-img
                                    :src="meetUp.imgUrl"
                                    height=400px
                                    contain
                                >
                    </v-img>
                    <v-card-text>
                        <div>
                            {{ meetUp.date }} - {{ meetUp.location }}
                        </div>
                        <div>
                            {{ meetUp.description }}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn >Register</v-btn>
                    </v-card-actions>
               </v-card>
           </v-flex>
       </v-layout>
    </v-container>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    meetUp () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetUp.creatorId
    }
  }
}
</script>
