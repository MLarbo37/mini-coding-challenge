<template>
  <v-card flat>
    <v-card class="videos" flat>
      <!-- VIDEO PLAYER -->
      <v-row class="justify-content-center ml-1 mr-n2 pr-0">
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card
            style="width: 98%; height: 350px;"
            class="
              d-flex
              align-items-center
              justify-content-center
              text-center
              cardBorder
            "
            flat
            outlined
          >
            <v-col class=" upload mt-15 mb-15">
              <v-icon class="upload">mdi-cloud-upload-outline</v-icon>
              <p>
                Drag and Drop files here <br />
                or
              </p>
              <v-btn
                class="svBtn"
                color="green"
                style="cursor: pointer"
                @click="getFile"
                >Upload here</v-btn
              >
                <input
                  ref="videoInput"
                  type="file"
                  accept="video/*"
                  id="fileUpload"
                  hidden
                  @change="handleFileUpload($event)"
                />
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'UploadVideo',
  data() {
    return {
      etags: [],
      eParts: [],
      formatData: {},
      filename: "",
      uploadId: "",
      file: null,
    }
  },
    methods: {
    createChunks(file, cSize) {
      let startPointer = 0;
      let endPointer = file.size;
      let chunks = [];
      while (startPointer < endPointer) {
        let newStartPointer = startPointer + cSize;
        chunks.push(file.slice(startPointer, newStartPointer));
        startPointer = newStartPointer;
      }
      return chunks;
    },
    getFile() {
      let fileUpload = document.getElementById("fileUpload");
      if (fileUpload != null) {
        fileUpload.click();
      }
    },
    uploadVideoToServer(videoDoc) {
      this.axios({
        url: "https://ju8bvysyne.eu-west-1.awsapprunner.com/azure-service/upload-old-video-presigned-url",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`,
        },
        data: { chunks_number: videoDoc.length },
      })
        .then((response) => {
          const eTagResponse = [];
          this.filename = response.data.data.filename;
          this.uploadId = response.data.data.uploadId;
          let res = response.data.data.presignedUrls;

          videoDoc.forEach((blob, index) => {
            const url = res[index];
            this.axios({
              url: url.presigned_url,
              method: "put",
              headers: {
                "Content-Type": "application/octet-stream",
              },
              data: blob,
            }).then(async (response) => {
              let refEtag = response.headers.etag.slice(
                1,
                response.headers.etag.length - 1
              );
              this.formatData = { PartNumber: index + 1, ETag: refEtag };
              eTagResponse.push(this.formatData);
              if (videoDoc.length === eTagResponse.length) {
                await this.serverUpload(eTagResponse);
              }
            });
          });
        })
        .catch((error) => error);
    },
    serverUpload(parts) {
      this.axios({
        url: "https://ju8bvysyne.eu-west-1.awsapprunner.com/azure-service/complete-old-video-upload",
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`,
        },
        data: {
          filename: this.filename,
          uploadId: this.uploadId,
          parts: parts,
          video_name: "GP Lap",
        },
      }).then((response) => {
        console.log("res", response);
      });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      const chunkSize = 5250000;
      const chunk = this.createChunks(this.file, chunkSize);
      this.uploadVideoToServer(chunk);
    }
  }
}
</script>


<style scoped>
.videos {
  background-color: #000000 !important;
  color: white;
}
.svBtn{
  color: white;
  text-transform: capitalize;
}
.upload{
  color: white;
}
.cardBorder{
  background-color: #000000 !important;
  color: white;
  border-style: dashed;
  border-color: white;
}
</style>