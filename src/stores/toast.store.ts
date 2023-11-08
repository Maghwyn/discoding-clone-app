import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useToastStore = defineStore({
    id: "store",
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