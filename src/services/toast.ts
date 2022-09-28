import { useToast } from "vue-toastification";

export class ToastService {
  private toast = useToast();

  success(message: string) {
    return this.toast.success(message);
  }
  error(message: string) {
    return this.toast.error(message);
  }
  warning(message: string) {
    return this.toast.warning(message);
  }
}
