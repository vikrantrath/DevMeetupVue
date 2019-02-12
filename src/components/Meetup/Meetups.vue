<template>
    <v-container v-if="meetUps.length>0">
        <v-layout row wrap v-for="item in meetUps" :key="item.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="pink lighten-2 ">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-img
                                     :src="item.imgUrl"
                                     height=130px
                                     contain
                                >
                                </v-img>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h2 class="white--text mb-0">{{ item.title }}</h2>
                                        <div>{{ item.date }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions >
                                    <v-btn light flat elevation-5 class="pink lighten-4" :to= "'/meetup/' + item.id">
                                        View Meetup
                                        <v-icon right>arrow_forward</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetUps () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
