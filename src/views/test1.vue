<template>
    <div class="input_box">
      <div class="flex justify-between label_div">
        <label class="block mb-1 my-1 pt-4 P250 N800 dark:text-gray-300">{{ label }}</label>
            
              <span v-if="requireTag"
                class="  bg-red-100 requiredSpan rounded-lg text-[#DD5928] text-xs px-1.5 py-1.5 mb-1.5 my-2 rounded dark:bg-red-200 dark:text-red-900"
              >
              Required
              </span>
      </div>
      <form>
        <div>
          <label>
            <input
              type="file"
              name="attachment[]"
              @change="onFileChange"
              ref="fileInput"
              multiple
              :placeholder="placeholder"
              :required="requireTag"
              accept="*/pdf"
              :disabled="files.length >= 5"
            />
          </label>
          <div>
            <div class="file_name" v-for="(file, index) in files" :key="index">
              <p>{{ file.name }} <img src="../../apps/loan-service/components/assets/svg/close-circle.svg" alt="close-circle-icon" @click="removeFile(index)" /></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  defineProps({
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    requireTag: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits<{
  (e:"onFileChange", files :any ):void
  }>()
  
  let files: any = ref([]);
  
  const onFileChange = (e: any) => {
    if (files.value.length < 5) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = 5 - files.value.length;
      files.value = files.value.concat(newFiles.slice(0, remainingSlots));
    }
    emit('onFileChange', files.value)
  };
  
  const clear = () => {
    files.value = [];
  };
  
  const removeFile = (index: number) => {
    files.value.splice(index, 1);
  };
  </script>