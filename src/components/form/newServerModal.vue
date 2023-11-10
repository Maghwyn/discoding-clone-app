<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import IconCross from "@/components/icons/IconCross.vue";
import {userServersStore} from "@/stores/userServers.store";

import { ref } from "vue";
import { addNewServer } from "@/api/server.req";

const emit = defineEmits<{
  (e: 'confirm'): void,
}>()

const serverName = ref('')
const bannerUrl = ref('')
const iconUrl = ref('')
const isPublic = ref(true)
const store = userServersStore()
async function createServer() {
  const res = await addNewServer({
    name: serverName.value,
    bannerUrl: bannerUrl.value,
    iconUrl: iconUrl.value,
    isPublic: isPublic.value
  })
  store.addUserServer(res.data)
  emit('confirm');
}
</script>

<template>
  <VueFinalModal
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-xl mx-4 p-4 bg-modal-chan dark:bg-gray-600 dark:border-gray-700 rounded-lg space-y-2"
      content-style="width:460px; height: 50%"
  >
    <slot></slot>
    <div style="display: flex; flex-direction: column; height: 100%">
      <div style="display: flex; justify-content: space-between">
        <h1 style="font-weight: 500; font-size: 20px">Créer un server</h1>
        <icon-cross width="26" height="26" style="cursor: pointer; color: rgb(112 117 124)" @click="emit('confirm')"/>
      </div>
      <div style="margin-top: 10px; height: 50%">
        <div style="width: 100%; padding: 7px; height: 40%">
          <h4>Nom du server</h4>
          <div class="input-salon">
            <input type="text" placeholder="nouveau-server" v-model="serverName">
          </div>
        </div>
        <div style="width: 100%; padding: 7px; height: 40%">
          <h4>Url de l'icone</h4>
          <div class="input-salon">
            <input type="text" placeholder="Url de l'icone" v-model="iconUrl">
          </div>
        </div>
        <div style="width: 100%; padding: 7px; height: 40%">
          <h4>Url de la bannière</h4>
          <div class="input-salon">
            <input type="text" placeholder="Url de la bannière" v-model="bannerUrl">
          </div>
        </div>
        <div style="width: 100%; padding: 7px; height: 40%">
          <h4>Public ?</h4>
          <div>
            <input type="checkbox"  v-model="isPublic">
          </div>
        </div>
        <div class="validation-zone">
          <button @click="()=> {emit('confirm')}">Annuler</button>
          <button style="background-color: #7289da" @click="createServer()">Créer un serveur</button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped>
.radio {
  background-color: #282b30;
  height: 50%;
  border-radius: 3px;
  margin: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.radio.selected {
  background-color: #3c3f46;
}

.input-salon {
  display: flex;
  width: 100%;
  height: 70%;
  align-items: center;
  background-color: #282b30;
  border-radius: 3px;

}

.input-salon input {
  width: 100%;
  height: 20%;
  background-color: #282b30;
  padding-left: 10px;
  height: 100%;
}

.input-salon svg {
  margin-left: 5px;
  height: 100%;
}

.validation-zone {
  display: flex;
  justify-content: end;
  height: 30%;
}

.validation-zone button {
  margin: 10px;
  border-radius: 3px;
  padding: 5px;
}
</style>
