<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12 sm6 class="text-sm-right text-xs-center">
              <v-btn large router to="/meetups" class="indigo darken-1" dark>Explore Meetups</v-btn>
          </v-flex>
          <v-flex xs12 sm6 class="text-sm-left text-xs-center">
              <v-btn large router to="/createmeetup" class="indigo darken-1" dark>Organize Meetups</v-btn>
          </v-flex>
      </v-layout>
      <v-layout>
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
      <v-layout row wrap v-if="!loading">
          <v-flex xs12 sm6 offset-sm3  >
                <v-carousel hide-delimiters style="cursor : pointer">
                    <v-carousel-item
                    v-for="(item,i) in meetUps"
                    :key="i"
                    :src="item.imgUrl"
                    @click="onLoadMeetup(item.id)"
                    >
                        <!-- <div class="hidden-sm-and-up" style="margin-left:33vmin; margin-top:120vmin"> {{ item.title }}</div> -->
                        <div style="position:absolute;bottom:50px;left:40%;right:40%;color:white;background-color:rgba(0,0,0,0.5);padding-left:4%;overflow:visible"> {{ item.title }}</div>
                    </v-carousel-item>
                </v-carousel>
          </v-flex>
      </v-layout>
  </v-container>
</template>
<script>

export default {
  computed: {
    meetUps () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading_status
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetup/' + id)
    }
  }
}
</script>
