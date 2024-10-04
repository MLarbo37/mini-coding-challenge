<template>
    <div class="mangePage">
      <PageBanner
        title="Setup loan form for your organization."
        anchorText=" Learn more about setting up loan form."
      />
      <div class="header">
        <div class="pageTitle">Loan forms ({{ allLoanForms.length }})</div>
        <div>
          <button
            @click="[(editMode = false), (addDialog = true)]"
            type="button"
            class="
              btn
              text-white
              btn-shadow
              P200
              bg-[#DD5928]
              hover:bg-[#B5461D]
              rounded-lg
              px-6
              py-1
              focus:outline-none focus:ring-2 focus:ring-[#EB9C7F]
            "
          >
            Add loan forms
          </button>
        </div>
      </div>
      <!-- <div v-if="queryLoading && allLoanForms.length === 0">
        <Loader />
      </div> -->
      <div>
        <div class="formsTable" v-if="allLoanForms.length == 0">
          <table class="manageFormsTable">
            <thead>
              <tr>
                <th class="head">Form name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
          <div class="emptyManageLoan">
            <EmptyManageLoanTable />
            <p class="emptyDesc">
              You haven’t created any loan form for your organisation yet.
            </p>
          </div>
        </div>
        <div class="formsTable" v-else>
          <table class="manageFormsTable">
            <thead>
              <tr>
                <th class="head">Form name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in allLoanForms"
                :key="index"
                height="64px"
              >
                <td class="head">
                  {{ data.form_type.type }}
                </td>
                <td>{{ data.form_status_type.type }}</td>
                <td>
                  <div class="mt-4 dropdown">
                    <TableAction />
                    <div class="dropdown-content">
                      <p class="p-4 P100 N600">ACTIONS</p>
                      <a
                        href="#"
                        class="flex items-center P200 O400"
                        @click="viewForm"
                      >
                        <ViewAction class="SPC-MR-100" />
  
                        <p>View</p></a
                      >
                      <a
                        href="#"
                        class="flex items-center P200 O400"
                        @click="editForm(item)"
                      >
                        <EditAction class="SPC-MR-100" />
                        <p>Edit</p></a
                      >
                      <a
                        href="#"
                        class="flex content-center P200 R400"
                        @click="archiveForm"
                      >
                        <ArchiveTable class="flex items-center SPC-MR-100" />
                        <p>Archive</p>
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <GDialog v-model="addDialog" max-width="34rem">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <h3 class="H600 N900 dark:text-">
              {{ editMode ? "Edit loan form" : "Add loan form" }}
            </h3>
            <CloseCircle @click="addDialog = false" />
          </div>
          <div class="px-4 mt-5">
            <InputFieldVue
              type="text"
              id="formName"
              label="Form name"
              :requireTag="true"
              placeholder="Name"
              :maxlength="50"
              v-model="loanForm.formName"
            />
          </div>
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
          <!-- <div class="px-4">
            <InputFieldVue
              id="formURL"
              label="Upload a pdf file"
              :requireTag="true"
              placeholder="Upload file"
              :maxlength="5000"
              :showlength="false"
              v-model="loanForm.formURL"
              @click="pickFile"
            />
          </div> -->
          <div class="flex justify-end">
            <div class="inline-block mt-3 mb-5 buttonBlock">
              <button
                @click="addDialog = false"
                class="btns text-[#DD5928] rounded-lg"
              >
                Cancel
              </button>
              <button
                v-if="editMode"
                class="
                  btns
                  text-white
                  bg-[#DD5928]
                  hover:bg-[#B5461D]
                  rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-[#EB9C7F]
                  disabled:opacity-25 disabled:cursor-not-allowed
                "
              >
                Update
              </button>
              <button
                v-else
                @click="($event) => uploadFormFile()"
                class="
                  btns
                  text-white
                  bg-[#DD5928]
                  hover:bg-[#B5461D]
                  rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-[#EB9C7F]
                  disabled:opacity-25 disabled:cursor-not-allowed
                "
                :disabled="loanForm.formName.trim().length < 1"
              >
                Save
              </button>
            </div>
            <div class="px-4">
              <InputFieldVue
                id="formURL"
                label="Upload a pdf file"
                :requireTag="true"
                placeholder="Upload file"
                :maxlength="50"
                v-model="loanForm.formURL"
              />
            </div>
            <div class="flex justify-end">
              <div class="inline-block mt-3 mb-5 buttonBlock">
                <button
                  @click="addDialog = false"
                  class="btns text-[#DD5928] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  v-if="editMode"
                  class="
                    btns
                    text-white
                    bg-[#DD5928]
                    hover:bg-[#B5461D]
                    rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#EB9C7F]
                    disabled:opacity-25 disabled:cursor-not-allowed
                  "
                  :disabled="loanForm.formName.trim().length < 1"
                >
                  Update
                </button>
                <button
                  v-else
                  @click="addForms.mutate()"
                  class="
                    btns
                    text-white
                    bg-[#DD5928]
                    hover:bg-[#B5461D]
                    rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#EB9C7F]
                    disabled:opacity-25 disabled:cursor-not-allowed
                  "
                  :disabled="loanForm.formName.trim().length < 1"
                >
                  Save
                </button>
              </div>
            </div>
        </div>
        </div>
      </GDialog>
      <GDialog v-model="archiveFormDialog" max-width="29.688rem">
        <ArchiveDialog
        @close-dialog="archiveFormDialog = false"
        component-title="Archive Loan Form"
        deleteBtn="Archive"
        @delete="archive"
        :delete-message="'<p>Are you sure you want to archive <span class=\'P250 N800\'>' +  loanForm.formName + '</span>?</p>'" 
        />
        <div class="p-4 mx-auto h-[157px]">
          <div class="flex items-center justify-between mb-3">
            <p class="loanType">Archive Loan Type</p>
            <CloseCircle @click="archiveFormDialog = false" />
          </div>
          <p class="mb-1">
            Are you sure you want to archive "<strong>Loan Forms</strong>"?
          </p>
          <div class="flex justify-end">
            <div class="inline-block mt-3 mb-5 buttonBlock">
              <button
                @click="archiveFormDialog = false"
                class="btns text-[#DD5928] rounded-lg"
              >
                Cancel
              </button>
              <button
                class="
                  btns
                  text-white
                  bg-[#DD5928]
                  hover:bg-[#B5461D]
                  rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-[#EB9C7F]
                "
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      </GDialog>
      <LoanDialog
        title="Welcome to loan forms"
        description="On this page you can create loan forms for the various specializations in your organization. Click on Add loan form to get started."
        @dialogActive="activateDialog"
        v-show="showDialog"
      />
    </div>
    <SuccessBlock
      v-if="success.block"
      :success="success"
      style="position: absolute; top: 10px; left: 20%; z-index: 1000"
      class="w-1/2"
    />
    <ErrorBlock
      v-if="Error.block"
      :error="Error"
      style="position: absolute; top: 10px; left: 20%; z-index: 1000"
      class="w-1/2"
    />
  </template>
    
  <script lang="ts" setup>
  import { reactive, ref } from "vue";
  import PageBanner from "../../components/reusables/PageBanner.vue";
  import EmptyManageLoanTable from "../../components/assets/svg/svgComponents/EmptyManageLoanTable.vue";
  import TableAction from "../../components/assets/svg/svgComponents/TableAction.vue";
  import CloseCircle from "../../components/assets/svg/svgComponents/CloseCircle.vue";
  import LoanDialog from "../../components/reusables/LoanWelcomeDialog.vue";
  import InputFieldVue from "../../../../components/Inputs/InputField.vue";
  import fileUpload from "../../../../components/Inputs/FileUpload.vue"
  import FileInputField from "../../components/reusables/FileInputField.vue";
  import ViewAction from "../../components/assets/svg/svgComponents/ViewAction.vue";
  import EditAction from "../../components/assets/svg/svgComponents/EditAction.vue";
  import ArchiveTable from "../../components/assets/svg/svgComponents/ArchiveTable.vue";
  import ArchiveDialog from "../../components/reusables/ArchiveDialog.vue";
  import { useQuery, useMutation, useQueryLoading, useMutationLoading } from "@vue/apollo-composable";
  import { GET_ALL_LOAN_FORMS } from "../../api/queries/loans";
  import { CREATE_LOAN_FORM, ARCHIVE_LOAN_FORM, PREVIEW_LOAN_FORM } from "../../api/mutations/loanFormsMutations";
  import SuccessBlock from "../../../../SuccessBlock.vue";
  import ErrorBlock from "../../../../ErrorBlock.vue";
  import axios from "axios";
  import func from "vue-temp/vue-editor-bridge";
  import { useStore } from "@/store/index";
  
  let addDialog = ref(false);
  let archiveFormDialog = ref(false);
  let showDialog = ref(true);
  let editMode = ref(false);
  let queryLoading = useQueryLoading();
  
  let loanForm = reactive({
    formName: "",
    formURL: "",
  });
  
  const store = useStore();
  
  const activateDialog = () => {
    showDialog.value = false;
  };
  
  let user_id = store.user.id;
  
  let rawFiles = ref([]);
  const fileSet = (files: any) => {
    rawFiles.value = files;
  };
  
  const editForm = (item: Array<object>) => {
    loanForm.id = item.id;
    editMode.value = true;
    loanForm.formName = item.name
    loanForm.formURL = "https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/Loan-forms/ffc9ed3d-d24e-44ec-a472-bfb326d06cb8undefined.pdf"
    addDialog.value = true;
    console.log("hhh",item.id);
    console.log("hhh",item.name)
  };
  const archiveForm = () => {
    archiveFormDialog.value = true;
  };
  
  const loading = useMutationLoading();
  const success = reactive({ block: false, title: "", message: "" });
  const Error = reactive({ block: false, title: "", message: "" });
  
  let allLoanForms = ref([]);
  const loanForms = useQuery(GET_ALL_LOAN_FORMS);
  loanForms.onResult((result) => {
    allLoanForms.value = result.data.getAllLoanForms;
    console.log(result.data.getAllLoanForms);
  });
  
  const addForms = useMutation(CREATE_LOAN_FORM, () => ({
    variables: {
      input: {
        form_type_name: loanForm.formName,
        form_url: loanForm.formURL,
      },
    },
  }));
  
  addForms.onDone(() => {
    success.block = true;
    success.title = "Success";
    addDialog.value = false;
    success.message = "Loan form successfully created";
    loanForms.refetch();
    setTimeout(() => {
      success.block = false;
    }, 3000);
  });
  
  // archiveLoanForm.onError((error) => {
  //   Error.block = true;
  //   archiveFormDialog.value = false;
  //   Error.title = "Could not delete loan form";
  //   Error.message = error.message.length <= 100 ? error.message : "Please contact support";
  //   setTimeout(() => {
  //     Error.block = false;
  //   }, 3000);
  // });
  
  function pickFile() {
    let fileUpload = document.getElementById("fileUpload");
    if (fileUpload != null) {
      fileUpload.click();
    }
  }
  
  // function uploadDocument(): Promise<void> {
  //     const formData = new FormData();
  //     console.log(rawFiles.value, "emitted");
  //     rawFiles.value.forEach((file) => {
  //       formData.append("uploadDocument", file);
  //     });
    
  //     return axios
  //       .post(`https://arms-s3.amalitech-dev.net/api/document?user_id=${user_id}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         imgData = response.data.url;
  //         console.log(imgData);
  //         uploadFile.mutate({
  //             data: {
  //               document_id: parseInt(input.folder),
  //               files: response.data.url,
  //               created_by: user_id,
  //               shareWith: [],
  //             },
            
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         imgData = null;
  //       });
  //   }
  
    let fformURL = ref(null);
  
  function uploadFormFile(): Promise<void> {
    const formData = new FormData();
    console.log(rawFiles.value, "emitted");
    rawFiles.value.forEach((file) => {
      formData.append("uploadFormFile", file);
    });
    return axios
      .post(
        `https://arms-s3.amalitech-dev.net/api/document?user_id=${user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        let fformURL = response.data;
        console.log(fformURL);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  // const addForms = useMutation(CREATE_LOAN_FORM);
  
  addForms.onDone((v) => {
    addDialog.value = false;
    console.log("done", v);
    success.block = true;
    success.title = "Success";
    success.message = "Loan form successfully created";
    loanForm.formName = "";
    loanForm.formURL = "";
    loanForms.refetch();
    setTimeout(() => {
      success.block = false;
    }, 3000);
  });
  
  addForms.onError(() => {
    addDialog.value = false;
    Error.block = true;
    Error.title = "Could not create loan form";
    Error.message = "Failed to create loan form";
    setTimeout(() => {
      Error.block = false;
    }, 3000);
  });
  </script>
    
    <style scoped>
  .mangePage {
    margin-top: 22px;
    padding-top: 1.5rem;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.375rem 0;
  }
  @media (max-width: 1024px) {
    .mangePage {
      margin: 1.2% 4%;
    }
  }
  @media (min-width: 1025px) {
    .mangePage {
      margin: 1.2% 5.5%;
    }
  }
  .mangePage::-webkit-scrollbar {
    display: none;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.375rem 0;
  }
  .pageTitle {
    color: #101840;
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 28px;
    height: 1.75rem;
  }
  .btn {
    background-color: #dd5928;
    padding: 8px, 16px, 8px, 16px;
    width: 170px;
    text-align: center;
    height: 41px !important;
  }
  .formsTable {
    margin-top: 1.5rem;
    height: 600px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .formsTable::-webkit-scrollbar {
    display: none;
  }
  .manageFormsTable {
    /* border: 1px solid red; */
    width: 100%;
  }
  .applicantsHead {
    padding-left: 1.5rem;
  }
  .manageFormsTable > thead {
    border: 1px solid #fafbff;
    height: 3.169rem;
    background: #fafbff;
    text-align: left;
  }
  .manageFormsTable > thead > tr {
    color: #101840;
    font-size: 13.33px;
    font-weight: 500;
  }
  .manageFormsTable > tbody > tr {
    border: 1px solid #e6e8f0;
  }
  .emptyManageLoan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1.25rem;
  }
  .emptyDesc {
    color: #8f95b2;
    width: 400px;
    text-align: center;
    margin-top: 1.5rem;
  }
  .dropdown {
    position: relative;
    width: fit-content;
  }
  .dropdown-content {
    visibility: hidden;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.16);
    border-radius: 8px;
    z-index: 1;
    right: 0px;
  }
  .dropdown-content a {
    color: #474d66;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown-content a:hover {
    background-color: #f9e0d7;
    color: #dd5928;
    border-left: 3px solid #dd5928;
  }
  .dropdown:hover .dropdown-content {
    visibility: visible;
  }
  .head {
    padding-left: 1.5rem;
  }
  .btns {
    margin-right: 10px;
    width: 90px;
    height: 40px;
  }
  .buttonBlock {
    text-align: right;
  }
  </style>
    