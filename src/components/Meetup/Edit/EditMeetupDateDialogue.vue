<template>
    <v-dialog width=350px persistent v-model= "editDialog">
        <v-btn floating accent slot="activator">
            Edit Date
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Meetup Date
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker v-model="editableDate" style="width:100%" actions>
                            <template>
                                <v-btn class="blue--text darken-1" @click= "editDialog=false" flat >Cancel</v-btn>
                                <v-btn class="blue--text darken-1" @click= "onSave" flat>Save</v-btn>
                            </template>
                        </v-date-picker>
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
      editableDate: null
    }
  },
  created () {
    const oldDate = this.meetup.date.split(' at ')[0]
    this.editableDate = oldDate
  },
  methods: {
    onSave () {
      const newDate = this.editableDate + ' at ' + this.meetup.date.split(' at ')[1]
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
