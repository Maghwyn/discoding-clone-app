<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import IconCross from "@/components/icons/IconCross.vue";
import IconRadioEmpty from "@/components/icons/IconRadioEmpty.vue";
import IconRadioFull from "@/components/icons/IconRadioFull.vue";
import IconAudio from "@/components/icons/IconAudio.vue";
import IconHashtag from "@/components/icons/IconHashtag.vue";
import { addNewChannel } from '@/api/channels.req'
import { channelsStore } from "@/stores/channel.store";
import { ref } from "vue";

const props = defineProps(['defaultCheck','serverId'])
const emit = defineEmits<{
  (e: 'confirm'): void,
}>()
const checked = ref(props.defaultCheck)
const store = channelsStore()
function onClose() {
  checked.value = 'text'
  channelName.value = ''
}

const channelName = ref('')

async function createChannel(){
  const serverId : string = store.channels[0].serverId
  const res = await addNewChannel({
    name: channelName.value,
    type: checked.value,
    serverId : serverId
  })
  store.addChannel(res.data)
  emit('confirm');
}
function radioGroupSelect(selected : string) {
  const text = document.getElementById('text')
  const vocal = document.getElementById('vocal')
  if ( selected == 'text' ) {
    if ( !text.classList.contains('selected') ) {
      text.classList.add('selected')
      text.ariaChecked = 'true'
      vocal.ariaChecked = 'false'
      vocal.classList.remove('selected')
      checked.value = 'text'
    }
  } else {
    if ( !vocal.classList.contains('selected') ) {
      vocal.classList.add('selected')
      vocal.ariaChecked = 'true'
      text.ariaChecked = 'false'
      text.classList.remove('selected')
      checked.value = 'audio'
    }
  }

}
</script>

<template>
  <VueFinalModal
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-xl mx-4 p-4 bg-modal-chan dark:bg-gray-600 dark:border-gray-700 rounded-lg space-y-2"
      content-style="width:460px; height: 50%"
      @closed="() => {onClose()}"
  >
    <slot></slot>
    <div style="display: flex; flex-direction: column; height: 100%">
      <div style="display: flex; justify-content: space-between">
        <h1 style="font-weight: 500; font-size: 20px">Créer un salon</h1>
        <icon-cross width="26" height="26" style="cursor: pointer; color: rgb(112 117 124)" @click="emit('confirm')"/>
      </div>
      <div style="margin-top: 10px; height: 50%">
        <p>Type de salon</p>
        <div role="radiogroup" class="radio-group" style=" width: 100%; height: 100%">
          <div role="radio" aria-checked="true" class="radio selected" id="text" @click="radioGroupSelect('text')">
            <div style="width: 10%">
              <icon-hashtag width="20px" height="20px" style="margin-left: 10px"/>
            </div>
            <div style="width: 80%">
              <H4>Text</H4>
              <p>Partage des images, des GIF, des émojis, des opinions et des blagues</p>
            </div>
            <div style="width: 10%">
              <IconRadioFull v-if="checked == 'text'"/>
              <IconRadioEmpty v-if="checked != 'text'"/>
            </div>
          </div>
          <div role="radio" aria-checked="false" class="radio" id="vocal" @click="radioGroupSelect('audio')">
            <div style="width: 10%">
              <icon-audio width="20px" height="20px" style="margin-left: 10px"/>
            </div>
            <div style="width: 80%">
              <H4>Vocal</H4>
              <p>Rejoins tes amis en vocal, en vidéo et avec le partage d'écran</p>
            </div>
            <div style="width: 10%">
              <IconRadioFull v-if="checked == 'audio'"/>
              <IconRadioEmpty v-if="checked != 'audio'"/>
            </div>
          </div>
          <div style="width: 100%; padding: 7px; height: 40%">
            <h4>Nom du salon</h4>
            <div class="input-salon">
              <IconAudio v-if="checked == 'audio'" width="15px" height="15px"/>
              <IconHashtag v-if="checked == 'text'" width="15px" height="15px"/>
              <input type="text" placeholder="nouveau-salon" v-model="channelName">
            </div>
          </div>
          <div class="validation-zone">
            <button @click="()=> {emit('confirm')}">Annuler</button>
            <button style="background-color: #7289da" @click="createChannel()">Créer un salon</button>
          </div>
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
