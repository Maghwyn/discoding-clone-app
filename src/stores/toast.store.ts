import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';

export const useToastStore = defineStore({
    id: "toastStoreId",
    state: () => ({
        validationFromSignup : false,
        messageContent: ""
    }),
    actions: {
        showSuccessToast(message) {
            toast.success(message, {
              autoClose: 3000,
            });
        },
        showErrorToast(message)  {
            toast.error(message, {
                autoClose: 3000, 
            });
        }
    }
    
});