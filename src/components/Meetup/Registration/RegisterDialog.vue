<template>
    <v-dialog width="500px" persistent v-model= "registerDialog">
        <v-btn floating accent slot="activator">
            {{ userIsRegistered ? 'Unregister' : 'Register'  }}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">
                            Unregister from Event
                        </v-card-title>
                        <v-card-title v-else>
                            Register for Event
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn color="error" @click="registerDialog=false" >Cancel</v-btn>
                            <v-btn color="success" @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(regmeetupId => {
        return regmeetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {

    }
  }
}
</script>
