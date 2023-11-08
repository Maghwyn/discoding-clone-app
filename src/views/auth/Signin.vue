<script lang="ts">
  import { useToastStore } from '@/stores/toast.store';
	const alert = useToastStore();
  if (alert.validationFromSignup) {
    setTimeout(function() {
      alert.showSuccessToast(alert.messageContent)
      alert.validationFromSignup = false
    }, 500)

  }
	
</script>
<template>
	<div>
		Signin page in coming...
	</div>
</template>
