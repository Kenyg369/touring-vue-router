import { ref } from "vue";
import { RouteLocationRaw, useRouter } from 'vue-router';

export interface MessagePayload {
    message: string;
    duration?: number;
    to?: RouteLocationRaw
}

const flashMessage = ref<string>("");

export function useFlashMessage() {
    const router = useRouter()

    const showMessage = (payload: MessagePayload) => {
        flashMessage.value = payload.message;

        setTimeout(() => {
            flashMessage.value = ''
        }, payload.duration ?? 3000)

        if (payload.to) {
            router.push(payload.to)
        }
    }

    return {
        flashMessage,
        showMessage
    }
}
