<script setup lang="ts">
import {computed, ref} from "vue";
import { useToastStore } from '@/stores/toast.store';
import {searchForChannelAndUser} from "@/api/search.req";
import Swal from "sweetalert2";
import router from "@/router";


const inputSearch = ref("")
let channelsAndUsers = ref({})

searchForChannelAndUser().then(
    (res) => {
      channelsAndUsers.value = res.data
    }
)

const redirect = (item) => {

  if (item["username"]) {
    console.log(item)
  } else {
    Swal.close()
    router.push({path: '/app/channels/'+item["channelId"]})
    console.log(item)
  }
}

const filteredChannels = computed(() => {
  if (!channelsAndUsers.value) {
    return [];
  }

  console.log(channelsAndUsers.value)
  // combine channels and users into a single array
  if (channelsAndUsers.value !== null && Object.keys(channelsAndUsers.value).length !== 0) {
    const allItems = [...channelsAndUsers.value["channels"], ...channelsAndUsers.value["users"]];

    return allItems.filter(item => {
      if (item.channelName) {
        return item.channelName.toLowerCase().includes(inputSearch.value.toLowerCase());
      } else if (item.username) {
        return item.username.toLowerCase().includes(inputSearch.value.toLowerCase());
      }

      return true;
    });
  }
});

</script>

<template>
  <div class="modal-container">
    <div class="position">
      <form class="container">
        <div class="centering-wrapper">
          <div class="">
            <div class="primary-header">Search </div>
            <div class="input-position">
              <div class="form-group">
                <div class="input-placeholder" id="email-txt">Search channel or user<span class="error-message" id="email-error"></span></div>
                <input type="text" required="true" name="friendUsername" v-model="inputSearch" class="form-style" id="friendUesrnameId" autocomplete="off" style="margin-bottom: 20px;">
                <i class="input-icon uil uil-at"></i>
              </div>
            </div>
            <div class="search-results">
              <ul>
                <li style="cursor: pointer" @click="redirect(item)" v-for="item in filteredChannels" :key="item.channelName || item.username">
                  {{ item.channelName || item.username }}
                </li>
              </ul>
            </div>
          </div>
          <div class="horizontalSeparator"></div>
        </div>
      </form>
    </div>
    <div class="modal-action">
    </div>
  </div>

</template>

<style scoped>

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.search-results {
  text-align: left;
  height: 70px;
  overflow-y: scroll;
}

.search-results > ul > li {
  margin-bottom: 10px;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.modal-body {
  background-color: #fff;
  border: 2px solid #74a2cf;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}
.modal-action {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
}
.modal-button {
  cursor: pointer;
  height: 30px;
  padding: 0 25px;
  border: 2px solid #74a2cf;
  border-radius: 5px;
  background-color: #80b2e4;
  color: #fff;
}
.modal-close {
  cursor: pointer;
  color: #ffffff;
  position: relative;
  align-self: end;
  left: 100%;
  top: -17px;
}


::-webkit-scrollbar{
  display: none;
}

#svgBlob{
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  background: transparent;
  transition: 1s;
}

.position{
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}

.container{
  width: 784px;
  max-width: 90vw;
  padding: 32px;
  background-color: #2a2b38;
  background: #363940;
  border-radius: 6px;
  left: 0;
  top: 0;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  flex-grow: 1;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
}

.centering-wrapper{
  width: 50%;
  text-align: center;
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
  flex: 1 1 auto;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
}

.section1{
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.primary-header{
  color: #fff;
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
  margin-bottom: 8px;
}

.secondary-header{
  color: #a2a3a7;
  font-size: 16px;
  line-height: 20px;
}

.input-position{
  margin-top: 20px;
}

.form-group{
  width: 100%;
  text-align: left;
}

.input-placeholder{
  color: #919296;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  /*text-transform: uppercase; */
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  cursor: default;
}

.error-message{
  color: #ec4846;
  font-style: italic;
  text-transform: none;
  font-size: 12px;
  font-weight: 100;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  transition: all 0.2s linear;
}

.form-style {
  position: relative;
  padding: 10px;
  height: 40px;
  width: 414px;
  max-width: 80vw;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #c4c3ca;
  background-color: #323338;
  border: 1px solid #282a2e;
  border-radius: 3px;
  outline: none;
  -webkit-transition: all 200ms linear;
  transition: border-color .2s ease-in-out;
}

.form-style:hover{
  border-color: #000;
}

.form-style:focus,
.form-style:active {
  border-color: #7289d9;
}

.form-style:active .input-placeholder{
  color: #7289d9;
}

.btn-position{
  width: 100%;
  display: grid;
  place-items: center;
}

.btn{
  text-decoration: none;
  border-radius: 4px;
  height: 44px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 200ms linear;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  outline: none;
  background-color: #7289d9;
  color: white;
  cursor: pointer;
}

.btn:hover{
  background-color: #677bc4;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}

.password-container {
  display: block;
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 20px;
  margin-top: 4px;
  width: 100%;
  height: auto;
  padding: 2px 90% 2px 0px;
  position: relative;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  background: none;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}

.link{
  color: #7289da;;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.link:hover{
  text-decoration: underline;
}

.horizontalSeparator{
  margin: 0 2.5vw;
  border: 1px solid #363940;
}

@media only screen and (max-width: 768px){
  body{
    background-position: 0px 0px;
  }
  svgBlob{
    top: 50;
    left: 0;
    transform: translate(0, -50%);
  }
  .qr-login{
    display: none;
  }
  .horizontalSeparator{
    display: none;
  }
  .container{
    padding: 20px;
  }
}

@keyframes jump{
  0%{
    transform: translateY(0px);
    opacity: 1;
  }
  50%{
    transform: translateY(10px);
  }
  75%{
    opacity: 0.5;
  }
  100%{
    transform: translateY(-70px);
    opacity: 0;
  }
}
</style>