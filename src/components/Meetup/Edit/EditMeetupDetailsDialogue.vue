<template>
    <v-dialog width=350px persistent v-model= "editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Meetup
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                v-model="editedTitle"
                                label="Title"
                                required
                            ></v-text-field>
                            <v-textarea
                            v-model="editedDescription"
                            label="Description"
                            required
                            ></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="onCancel">
                                Cancel
                            </v-btn>
                            <v-btn flat class="blue--text darken-1" @click="onSave">
                                Save
                            </v-btn>
                        </v-card-actions>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    onCancel () {
      this.editDialog = false
    },
    onSave () {
      const newMeetup = {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      }
      this.$store.dispatch('updateMeetup', newMeetup)
      this.editDialog = false
    }
  }
}
</script>
