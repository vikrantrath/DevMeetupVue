<template>
    <v-container>
        <v-layout row class="mb-5">
            <v-flex xs12 sm6 md4 offset-xs4>
                <h1>Create A New Meetup</h1>
            </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
    <form  @submit.prevent="onCreateMeetup">
      <v-layout row wrap>
        <v-flex
          xs12
          md4
          offset-md3
        >
          <v-text-field
            v-model="title"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="location"
            label="Location"
            required
          ></v-text-field>
          <v-layout row>
            <v-flex xs6>
              <v-btn raised class="primary" @click="onPickFile">
                Upload Image
              </v-btn>
                <input type="file"
                name="imgUrl"
                ref="fileInput"
                style="display:none"
                accept="image/*"
                @change="onFilePicked" >
            </v-flex>
            <v-flex xs6>
                    <v-img
                    :src="imgUrl"
                    height=130px
                    contain
                    class="px-1"
                    >
                    <div style="position:absolute;bottom:50px;left:40%;right:40%;color:white;background-color:rgba(0,0,0,0.5);padding-left:2%;overflow:visible" class="text-align-center hidden-xs-only">Preview</div>
                    </v-img>
            </v-flex>
        </v-layout>
          <v-textarea
            v-model="description"
            label="Description"
            required
          ></v-textarea>
              <v-flex xs10 sm5 offset-sm2 offset-xs1>
                  <v-date-picker v-model="datePicker" :landscape="false" :reactive="true"></v-date-picker>
              </v-flex>
              <v-flex xs10 sm5 offset-sm2 offset-xs1>
              <v-time-picker v-model="timePicker" :landscape="false"></v-time-picker>
              </v-flex>
          <v-btn color="success" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
        </v-flex>
        </v-layout>
       </form>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    datePicker: new Date().toISOString().substr(0, 10),
    timePicker: null,
    title: '',
    location: '',
    imgUrl: '',
    description: '',
    image: null
  }),
  computed: {
    formIsValid () {
      return this.title !== '' &&
          this.location !== '' &&
          this.imgUrl !== '' &&
          this.description !== ''
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.datePicker + ' at ' + this.timePicker
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please Select a valid image')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }

  }
}
</script>
