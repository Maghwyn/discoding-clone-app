<script setup lang="ts">
  import AddFriendForm from "@/components/AddFriendForm.vue";
  import {createConfirmDialog} from "vuejs-confirm-dialog";

  const { reveal } = createConfirmDialog(AddFriendForm, { msg: 'Hi!'})


</script>


<template>
  <div>
    <button @click="reveal">
      click stp
    </button>
    <DialogsWrapper />
  </div>
</template>

<style>

</style>