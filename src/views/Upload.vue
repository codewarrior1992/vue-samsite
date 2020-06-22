<template>
  <div class="upload">
    <div class="prvie">
      <img :src="imgUrl" class="img-preview" />
      <input type="file" @change="preview" />
      <button @click="uploader">submit the image</button>
    </div>

    <div class="info" v-for="(item,key) in data" :key="key">
      <div class="title">{{item.title}}</div>
      <div class="img" :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export default {
  name: "Home",
  data() {
    return {
      file: "",
      imgUrl: null,
      data: []
    };
  },
  methods: {
    preview(e) {
      this.file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(this.file);
      console.log(this.imgUrl);
    },
    uploader(e) {
      const file = this.file;
      const dbRef = firebase.database().ref("products");
      const storageRef = firebase.storage().ref();

      // 設定上傳類型
      let metadata = {
        contentType: "image/jpeg"
      };

      // 上傳到 storage
      let uploadTask = storageRef
        .child("/images/" + file.name)
        .put(file, metadata);

      uploadTask.on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);

            const product = dbRef.push();
            const key = product.key;

            dbRef.push({
              title: file.name,
              imgUrl: downloadURL,
              id: key
            });
          });
        }
      );
      this.getData();
    },
    getData() {
      this.$http
        .get("https://immense-sea-68651.herokuapp.com/get-products")
        .then(res => {
          this.data = res.data.result;
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss">
.img-preview {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.info {
  margin-top: 50px;
}
</style>
