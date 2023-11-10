import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useToastStore = defineStore({
    id: "toastStoreId",
    state: (): {
        validationFromSignup : boolean,
        messageContent: string
    } => ({
        validationFromSignup : false,
        messageContent: ""
    }),

    actions: {
        showSuccessToast(message: string) {
            toast.success(message, {
              autoClose: 3000,
            });
        },

        showErrorToast(message: string)  {
            toast.error(message, {
                autoClose: 3000, 
            });
        }
    }
    
});