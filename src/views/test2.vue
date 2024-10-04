<template>
    <div class="px-0 sm:px-4 h-[83vh] w-full">
      <!-- Starting of page Info Alert -->
      <div
        v-show="alertState"
        v-if="props.data.length === 0 && showMessage"
        class="add-files-popup flex p-3 mt-5 text-sm border border-[#E6E8F0] text-gray-700 bg-[#FAFBFF] rounded-lg dark:bg-gray-700 dark:text-gray-300 SPC-MB-300"
        role="alert"
      >
        <div class="pt-1 SPC-MR-200">
          <img src="../../../assets/info-circle.svg" alt="info-icon" />
        </div>
  
        <div class="P200">
          <span class="N800">Add files to your organization's folder. </span>
          <span class="O400">
            <a href="/learnmore">Learn more about setting up Documents &amp; Policies .</a>
          </span>
        </div>
  
        <button
          type="button"
          @click="showMessage = false"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <img src="../../../assets/close-circle.svg" alt="close-circle-icon" />
        </button>
      </div>
      <!-- Ending of page Info Alert -->
  
      <!-- Page header -->
      <header
        class="flex mt-10 sm:mt-5 flex-row sm:flex-row items-center sm:justify-between SPC-MB-200"
      >
        <h3 class="H700 N900">
          {{
            props.data.folder_name.length > 20
              ? props.data.folder_name.slice(0, 10) + "..."
              : props.data.folder_name
          }}
          (0)
        </h3>
  
        <!-- Search starting -->
        <div class="flex justify-center sm:justify-end mt-2 sm:mt-0">
          <button
            class="text-white btn-shadow P200 bg-[#DD5928] hover:bg-[#B5461D] rounded-lg px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB9C7F] addEventButton"
            @click="[(dialogState = true), (editMode = false)]"
          ></button>
        </div>
        <!-- Search Ending -->
      </header>
      <!-- End of Page header -->
  
      <!-- Starting of table content -->
      <main>
        <div>
          <table
            aria-label="departent table"
            class="table-auto w-full text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="N900 bg-[#FAFBFF] border border-b[#E6E8F0] dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="py-4 px-2 sm:px-4 H400 normal-case">Name</th>
                <th scope="col" class="py-4 px-2 sm:px-4 H400 normal-case">Date Created</th>
                <th scope="col" class="py-4 px-2 sm:px-4 H400 normal-case">Actions</th>
              </tr>
            </thead>
            <tbody v-if="props.data.folders_files.length > 0">
              <tr v-for="(item, i) in props.data.folders_files" :key="i">
                <td class="py-1 px-2 sm:px-4">
                  <div>
                    <img src="" alt="" />
                    {{ item.file_name  }}
                  </div>
                </td>
  
                <td class="py-1 px-2 sm:px-4">
                  <div>
                    <img src="" alt="" />
                    {{ item.created_at }}
                  </div>
                </td>
  
                <td class="py-1 px-2 sm:px-4">
                  <div class="dropdown">
                    <img
                      src="../../../assets/Actions_Icon.svg"
                      class="mt-1 dropbtn"
                      alt="Actions"
                    />
                    <div class="dropdown-content">
                      <p class="P100 N600 p-4">ACTIONS</p>
  
                      <a href="#" class="flex P200 O400" @click="renameState = true">
                        <img
                          src="../../../assets/rename.svg"
                          class="SPC-MR-100"
                          alt="edit"
                        />Rename</a
                      >
                      <a href="#" class="flex P200 O400"
                       @click="dialogState = true">
                        <img
                          src="../../../assets/share.svg"
                          class="SPC-MR-100"
                          alt="edit"
                         
                        />Share</a
                      >
                      <a
                        href="#"
                        class="P200 R400 flex content-center"
                        @click="deleteState = true"
                      >
                        <img
                          src="../../../assets/trash.svg"
                          class="SPC-MR-100"
                          alt="delete"
                        />Delete</a
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Loading state -->
        <div class="loader" v-if="queryLoading && props.datafolders_files.length === 0"></div>
  
        <!-- Starting of Empty State -->
        <div v-else-if="props.data.folders_files.length === 0" class="w-1/3 m-auto mt-24 text-center">
          <img
            class="ml-auto mr-auto"
            src="../../../assets/not_found.svg"
            alt="Not found image"
          />
          <p class="text-[#8F95B2]">You haven't created any files to this folder yet :(</p>
        </div>
        <!-- End of Empty State -->
      </main>
      <!-- Ending of table content -->
  
      <!-- Start of upload dialog -->
      <GDialog
        max-width="500"
        v-model="dialogState"
        class="relative p-4 w-full max-w-md h-full md:h-auto"
      >
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="H600 N900 dark:text-white">Upload file</h3>
          <button
            type="button"
            @click="dialogState = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <img src="../../../assets/close-circle.svg" alt="close-circle-icon" />
          </button>
        </div>
        <form>
          <div class="mb-6 px-4">
            <fileUpload
              @on-file-change="fileSet"
              label="Upload File"
              v-model="selectedFiles"
              type="file"
              :requireTag="true"
              :multiple="true"
              :maxFiles="5"
              :maxFileSize="2097152"
              id="default-input"
              placeholder="Select file"
              class="bg-gray-50 border border[#d8dae5] hover:border-[#8F95B2] text-gray-900 rounded-lg focus:outline-[#E47A53] focus:ring-[#F2BEAB] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] w-11/12 p-2.5 ml-5"
            />
          </div>
          <div class="mb-6 px-4">
            <SelectField
              label="Folder"
              type="text"
              data-cy="company-folder"
              id="manager"
              :requireTag="true"
              placeholder="Choose a folder"
              v-model="input.folder"
              :options="props.allFolders"
              param="folder_name"
            />
          </div>
          <div class="mb-6 px-4">
            <SelectField
              v-model="input.share_option"
              label="Share"
              type="text"
              data-cy="Share with"
              @change="onShareOptionChange"
              id="Share with"
              :requireTag="false"
              placeholder="Select option"
              :options="[
                'Share with specific individual',
                'Share with group',
                'Share with all employees',
              ]"
            />
          </div>
         
          <div v-if="input.share_option === 'Share with group'" class="mb-6 px-4">
           
                  <ProjectChipInput
                   @selected="addSelectDepartment"
                :param="department_name"
                :param_id="id"
                :options="allDepartments"
                :preChips="listOfSelected"
                :label="'Assign access level'"
                :enabledState="false"
                :requireTag="true"
                />
          </div>
          <div v-if="input.share_option === 'Share with group'" class="mb-6 px-4">
          
                  <ProjectChipInput
                   @selected="addSelectLocation"
                :param="branch_name"
                :param_id="id"
                :options="allLocations"
                :preChips="listOfSelected"
                :enabledState="false"
                />
          </div>
          <div class="mb-6 px-4" v-if="input.share_option === 'Share with group'">
          
                  <ProjectChipInput
                   @selected="addSelectPosition"
                :param="position_name"
                :param_id="id"
                :options="allPositions"
                :preChips="listOfSelected"
                :enabledState="false"
                :requireTag="true"
                />
          </div>
          <div v-if="input.share_option === 'Share with specific individual' " class="mb-6 px-4">
            <ProjectChipInput
            @selected="addSelect"
                :param="full_name"
                :param_id="id"
                :options="usersData"
                :preChips="listOfSelected"
                :enabledState="false"
                :requireTag="true"
                />
          </div>
          <div class="flex justify-end w-11/12 ml-5 mb-6">
            <button class="text-[#DD5928] SPC-MR-200" @click="dialogState = false">
              Cancel
            </button>
            <button
              @click="uploadDocument()"
              type="button"
              class="text-white btn-shadow P200 bg-[#DD5928] hover:bg-[#B5461D] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB9C7F] disabled:opacity-25 disabled:cursor-not-allowed flex"
            >
              <div v-if="loading" role="status">
                <svg
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#DD5928]"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
                &nbsp;
              </div>
              Save
            </button>
          </div>
        </form>
      </GDialog>
  
      <!-- End of upload dialog -->
      <!-- Start of rename dialog -->
      <GDialog
        max-width="500"
        v-model="renameState"
        class="relative p-4 w-full max-w-md h-full md:h-auto"
      >
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="H600 N900 dark:text-white">Rename file</h3>
          <button
            type="button"
            @click="renameState = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <img src="../../../assets/close-circle.svg" alt="close-circle-icon" />
          </button>
        </div>
        <form>
          <div class="mb-6">
            <div class="flex justify-between labelDiv">
              <label class="block mb-2 P250 N800 dark:text-gray-300 ml-5" for="branchName">
                File name
              </label>
              <span
                class="bg-red-100 requiredSpan rounded-lg text-[#DD5928] text-xs px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
              >
                Required
              </span>
            </div>
            <fileUpload
              type="text"
              id="default-input"
              placeholder="Enter folder name"
              class="bg-gray-50 border border[#d8dae5] hover:border-[#8F95B2] text-gray-900 rounded-lg focus:outline-[#E47A53] focus:ring-[#F2BEAB] focus:ring peer block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F2BEAB] dark:focus:border[#d8dae5] w-11/12 p-2.5 ml-5"
            />
          </div>
          <div class="flex justify-end w-11/12 ml-5 mb-6">
            <button class="text-[#DD5928] SPC-MR-200" @click="dialogState = false">
              Cancel
            </button>
            <button
              type="button"
              class="text-white btn-shadow P200 bg-[#DD5928] hover:bg-[#B5461D] rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB9C7F] disabled:opacity-25 disabled:cursor-not-allowed flex"
            >
              <div v-if="loading" role="status">
                <svg
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#DD5928]"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
                &nbsp;
              </div>
              Save
            </button>
          </div>
        </form>
      </GDialog>
  
      <!-- End of rename dialog -->
      <!-- Starting of delete dialog -->
      <GDialog
        max-width="500"
        v-model="deleteState"
        class="relative p-4 w-full max-w-md h-full md:h-auto"
      >
        <div class="flex justify-between items-start p-4 rounded-t dark:border-gray-600">
          <h3 class="H600 N900 dark:text-white">Delete</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="deleteState = false"
          >
            <img src="../../../assets/close-circle.svg" alt="close-circle-button" />
          </button>
        </div>
        <div>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4">
              <h3 class="mb-5 P200 N800 text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this folder and all its content? This action
                can’t be undone
              </h3>
              <div class="grid justify-items-end">
                <div class="flex">
                  <button type="button" class="text-[#DD5928] mr-2">Delete</button>
  
                  <button
                    @click="deleteState = false"
                    type="button"
                    class="text-white bg-[#DD5928] hover:bg-[#B5461D] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GDialog>
      <!-- Ending of delete dialog -->
    </div>
    <SuccessBlock
      v-if="success.block"
      :success="success"
      style="position: absolute; top: 10px; z-index: 1000"
      class="w-1/2"
    />
    <ErrorBlock
      v-if="Error.block"
      :error="Error"
      style="position: absolute; top: 10px; left: 20%; z-index: 1000"
      class="w-1/2"
    />
  </template>
  
  <script setup lang="ts">
  import { ref, reactive,computed } from "vue";
  import fileUpload from "../../../components/Inputs/FileUpload";
  import SelectField from "@/components/Inputs/SelectField.vue";
  import { useMutation, useMutationLoading } from "@vue/apollo-composable";
  import { FILE_UPLOAD } from "../graphql/mutations/policies_and_documents.ts";
  import ProjectChipInput from "../../resource-manager/components/ProjectChipInput";
  import {
    SHARE_WITH_ALL,
    SHARE_WITH_GROUP,
  } from "../graphql/queries/document_and_policies_queries.ts";
  import { GET_COMPANY_DOCUMENT,  ACTIVE_EMP_INFO_USERS } from "../../../graphql/queries/queries.ts";
  import SuccessBlock from "../../../SuccessBlock.vue";
  import ErrorBlock from "../../../ErrorBlock.vue";
  import { useQuery } from "@vue/apollo-composable";
  import { useStore , useConfig } from "@/store/index";
  import axios from "axios";
  const config = useConfig();
  const store = useStore();
  const success = reactive({ block: false, title: "", message: "" });
  const Error = reactive({ block: false, title: "", message: "" });
  let input = reactive({
    share_option: "",
    file: "",
    folder:  "",
    employee_type: "",
    department: "",
    location: "",
    position: "",
    specific_individuals: "",
  });
  //fetch all departments
  const allDepartments = config.departments.map(item => ({id: item.id, name: item.department_name}));
  //fetch all positions
  const allPositions = config.positions.map(item => ({id: item.id, name: item.position_name}));
  //Fetch locations
  const allLocations = config.locations.map(item => ({id: item.id, name: item.branch_name}));
  
  let dialogState = ref(false);
  let deleteState = ref(false);
  let editMode = ref(false);
  let alertState = ref(true);
  let showMessage = ref(true);
  
  let renameState = ref(false);
  let rawFiles = ref([]);
  const fileSet = (files: any) => {
    rawFiles.value = files;
  };
  
  let selectedLocation = ref([]);
  function addSelectLocation(data: string) {
    const values = Object.values(data);
    const selected = values.map((value) => Number(value));
    selectedLocation.value = selected
  }
  let selectedPosition = ref([]);
  function addSelectPosition(data: string) {
    const values = Object.values(data);
    const selected = values.map((value) => Number(value));
    selectedPosition.value = selected
  }
  let selectedDepartment = ref([]);
  function addSelectDepartment(data: string) {
    const values = Object.values(data);
    const selected = values.map((value) => Number(value));
    selectedDepartment.value = selected
  }
  let selectedUsers = ref([]);
  function addSelect(data: string) {
    const values = Object.values(data);
    const selected = values.map((value) => Number(value));
    selectedUsers.value = selected
  }
  const props = defineProps<{
    data: object;
    files: Array<unknown>;
    allFolders: {
      type: Array;
    };
  }>();
  let shareWith = ref([])
  let shareOptionSelected = ref("")
   
  let imgData = ref(null);
  let user_id = store.user.id;
  // const closeDialog = () => {
  //   alertState.value = false;
  // }
  async function uploadDocument() {
    //Resolve People to share File with with
    shareWith.value = []
    if(shareOptionSelected.value === "all"){
     const result:any = await shareWithAll.refetch()
     shareWith.value =result.data.shareWithAll
    }
    if(shareOptionSelected.value === "group"){
      const result:any = await shareWithGroup.refetch({"data": {
        "location": selectedLocation.value,
      "department": selectedDepartment.value,
      "position": selectedPosition.value}})
      shareWith.value = result.data.shareWithGroup
    }
    if(shareOptionSelected.value === "individual"){
      console.log("helol",selectedUsers.value)
      shareWith.value = selectedUsers.value
    }
  
    console.log(shareOptionSelected.value, shareWith.value)
    const formData = new FormData();
    rawFiles.value.forEach((file) => {
      formData.append("uploadDocument", file);
    });
    return axios
      .post(`https://arms-s3.amalitech-dev.net/api/document?user_id=${user_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        imgData = response.data.url;
        uploadFile.mutate({
            data: {
              document_id: parseInt(input.folder),
              files: response.data.url,
              created_by: user_id,
              shareWith: shareWith.value
            },
        });
      })
      .catch((error) => {
        console.error(error);
        imgData.value = null;
      });
  }
  let files = ref([]);
  const getDocument = useQuery(GET_COMPANY_DOCUMENT);
  getDocument.onResult((result) => {
    files.value = result.data.listDocuments.folders_files;
    console.log('hi--->', document.value   )
  });
  
  const listOfSelected: any = ref([]);
  let allUsers = ref([]);
  const empUsers = useQuery(ACTIVE_EMP_INFO_USERS, {
    data: {
      take: 1000,
      skip: 0,
    },
  });
  empUsers.onResult((result) => {
    allUsers.value = result.data.activeUsers;
  });
  
  let usersData = computed(() => {
    return allUsers.value?.map((user) => {
      return {
        id: user.user_id,
        name: user.employee_bio?.full_name,
      };
    });
  });
   let groupShare = ref({})
    const updateGroupShare = () => {
        groupShare.value = {
          locations: Array.from(
          new Set(selectedLocation.value.map((v) => Number(v)))
        ),
          positions: Array.from(
          new Set(selectedPosition.value.map((v) => Number(v)))
        ),
          departments:  Array.from(
          new Set(selectedDepartment.value.map((v) => Number(v))))
        };
        // console.log(selectedLocation)
        // console.log(selectedDepartment)
        // console.log(selectedPosition)
        //shareWithGroup.refetch(groupShare.value)
      };
  
  
  
  let shareAll = ref([])
  let shareGroup = ref([])
  const shareWithAll = useQuery(SHARE_WITH_ALL);
  // shareWithAll.onResult((result) => {
  //   console.log("Share With all Run")
  //   console.log("all",result)
  //   shareAll.value = result.data.shareWithAll;
  // });
  const shareWithGroup = useQuery(SHARE_WITH_GROUP,{});
  
   const onShareOptionChange = () => {
        if (input.share_option === 'Share with specific individual') {
          // set the value for the 'Share with specific individual' option
          // shareWith.value = Array.from(
          // new Set(selectedUsers.value.map((v) => Number(v))))
          shareOptionSelected.value = "individual"
        } else if (input.share_option === 'Share with group') {
          // set the value for the 'Share with group' option 
           //shareWith.value = shareGroup.value;
           shareOptionSelected.value = "group"
          
        } else if (input.share_option === 'Share with all employees') {
          // set the value for the 'Share with all employees' option
          //input.share_option = shareAll.value;
          //shareWith.value = shareAll.value
          shareOptionSelected.value= "all"
        }
      };
  const uploadFile = useMutation(FILE_UPLOAD);
  
  uploadFile.onDone((result) => {
    success.block = true;
    success.title = "Success";
    renameState.value = false;
    success.message = "Employee folder created successfully";
    setTimeout(() => {
      getDocument.refetch()
      success.block = false;
    }, 3000);
    console.log(result.data);
  });
  uploadFile.onError(() => {
    Error.block = true;
    Error.title = "Whoops...";
    Error.message = "Failed to create employee folder";
    dialogState.value = false;
    setTimeout(() => {
      Error.block = false;
    }, 5000);
  });
  
  
  </script>
  
  <style scoped>
  .onboarding {
    background: #ffffff;
    box-shadow: 0px 12px 40px rgba(16, 24, 64, 0.24);
    border-radius: 8px;
    width: 400px;
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
  
  .requiredSpan {
    margin-bottom: 5px;
  }
  
  label {
    margin-top: 10px;
    margin-left: 15px;
  }
  
  table {
    border: 1px solid #e6e8f0;
    border-radius: 20px;
  }
  
  main {
    border-radius: 20px;
  }
  
  tr:nth-child(even) {
    border: 1px solid #e6e8f0;
  }
  
  tbody tr:hover {
    background-color: #edeff5;
  }
  
  /* Dropdown Button */
  .dropbtn {
    /* background-color: #ffffff; */
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }
  
  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.16);
    border-radius: 8px;
    z-index: 1;
  }
  
  /* Links inside the dropdown */
  .dropdown-content a {
    color: #474d66;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #f9e0d7;
    color: #dd5928;
    border-left: 3px solid #dd5928;
  }
  
  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: #fafbff;
    border-radius: 8px;
  }
  
  .secondaryButton {
    width: 92px;
    height: 40px;
    flex: none;
    order: 1;
    flex-grow: 0;
    border: 1px solid #d8dae5;
    border-radius: 8px;
    color: #696f8c;
  }
  
  .secondaryButton:hover {
    color: #474d66;
    border: 1px solid #8f95b2;
  }
  
  /* TOOLTIP */
  .tooltiptext {
    max-width: 400px;
    max-height: 100px;
    background-color: hwb(0 0% 100% / 0.63);
    color: #fff;
    border-radius: 8px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    margin-top: 56px;
  }
  
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #dd5928;
    width: 120px;
    margin: auto;
    margin-top: 30px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    /* Safari */
    animation: spin 1s linear infinite;
  }
  
  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
  
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* media queries */
  @media screen and (max-width: 1024px) {
    #createEventBtn {
      visibility: hidden;
    }
  
    #mobileCreateEventBtn {
      visibility: visible;
    }
  }
  
  @media screen and (max-width: 1023px) {
    .addEventButton:before {
      content: "+";
    }
  }
  @media screen and (min-width: 1024px) {
    .addEventButton:before {
      content: "Upload File";
    }
  }
  
  /* Take out the alert when user is on the mobile view */
  /* Suppose to take out the entire div */
  @media (max-width: 670px) {
    .add-files-popup {
      display: none !important;
    }
  
    header {
      justify-content: space-between;
    }
  }
  .truncate {
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  