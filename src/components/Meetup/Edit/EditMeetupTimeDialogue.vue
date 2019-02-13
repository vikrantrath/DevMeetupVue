<template>
    <v-dialog width=350px persistent v-model= "editDialog">
        <v-btn floating accent slot="activator">
            Edit Time
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Meetup Time
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker v-model="editableTime" style="width:100%" actions>
                            <template >
                                <v-btn class="blue--text darken-1" @click= "editDialog=false" flat >Cancel</v-btn>
                                <v-btn class="blue--text darken-1" @click= "onSave" flat>Save</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  created () {
    const oldTime = this.meetup.date.split(' at ')[1]
    this.editableTime = oldTime
  },
  methods: {
    onSave () {
      const newDate = this.meetup.date.split(' at ')[0] + ' at ' + this.editableTime
      const payload = {
        id: this.meetup.id,
        date: newDate
      }
      this.$store.dispatch('updateMeetupDate', payload)
      this.editDialog = false
    }
  }
}
</script>
