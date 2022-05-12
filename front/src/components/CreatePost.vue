<template>
  <Form @submit="sendForm(files)">
    <div class="post">
      <div class="post__title">
        <label for="title">Titre :</label>
        <Field type="text" name="title" id="title" v-model="title" placeholder="Titre" required />
        <ErrorMessage name="title" />
      </div>

      <div class="post__content">
        <label for="content">Contenu : </label>
        <textarea name="content" id="content" v-model="content" placeholder="Contenu du post..." />
        <ErrorMessage name="content" />
      </div>
      <div class="post__attachement">
        <label for="text">Lien : </label>
        <Field type="text" name="attachement" id="attachement" v-model="attachement"  placeholder="Lien" />
        <ErrorMessage name="attachement" />
      </div>
      <div class="dropzone">
        <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
          <label for="file-input">
            <ul class="image-list" v-show="files.length">
              <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
            </ul>
            <span v-if="dropZoneActive">
              <span>Déposez ici votre image</span>
            </span>
            <span v-else>
              <span>Glissez votre image ici</span>
              <span class="smaller">
                ou <strong><em>cliquez ici</em></strong> pour sélectionner un fichier
              </span>
            </span>
            <input type="file" id="file-input" @change="onInputChange" />
          </label>
        </DropZone>
      </div>

      <div class="post__submit">
        <input type="submit" value="Créer Post" id="submit" />
      </div>
    </div>
  </Form>
  <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message.error || message }}</div>

</template>


<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import DropZone from "@/components/DropZone";
import FilePreview from "@/components/FilePreview";
import useFileList from '../store/file-list.js'
import axios from "axios";
import {uploadFiles} from "@/store/file-uploader";
//import createUploader from "@/store/file-uploader";


export default {
  name: "CreatePost",
  components: {
    FilePreview,
    Form,
    Field,
    ErrorMessage,
    DropZone
  },
  setup(){
    const { files, addFiles, removeFile } = useFileList()

    //const { uploadFiles } = createUploader('http://localhost:3000/api/...')

    function onInputChange(e) {
      addFiles(e.target.files)
      e.target.value = null
    }

    return { files, addFiles, removeFile, onInputChange, /*uploadFiles*/}
  },
  data() {
    return {
      post: null,
      title: null,
      content: null,
      attachement: null,
      FILE: null,
      submitted: false,
      successful: false,
      message: ''
    }
  },
  methods : {
    sendForm(files) {
      this.message = '';
      let user = JSON.parse(localStorage.user).userId
      this.post = {
        title: this.title,
        content: this.content,
        userId: user
      }
      console.log(this.post, 'le post')
      const formData = new FormData()
      uploadFiles(files);
      console.log(formData, ' 12345645646')

      //formData.append('attachement', this.FILE)

      formData.append('post', JSON.stringify(this.post))

      axios.post('http://localhost:3000/api/posts', formData)
          .then(data => {
                this.message = data;
                this.successful = true;
                setTimeout( () => this.$router.push('/forum'), 3000)
              },
              error => {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          )
    }

  }
}
</script>

<style lang="scss">
.drop-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background: #ffffff55;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: .2s ease;
  &[data-active=true] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #ffffffcc;
  }
}
label {
  font-size: 25px;
  cursor: pointer;
  display: block;
  span {
    display: block;
  }
  input[type=file]:not(:focus-visible) {
    //Visually hidden when not focused
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .smaller {
    font-size: 16px;
  }
}
.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}

</style>