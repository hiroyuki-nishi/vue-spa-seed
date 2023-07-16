import {Notify} from "quasar";

export const showNotify = (message: string, timeout=5000) => {
    Notify.create({
        multiLine: true,
        html: true,
        message: message,
        color: "secondary",
        position: "top",
        timeout: timeout,
        actions: [{label: "Close",},],
    });
}
export const showNotifyError = (message: string) => {
    Notify.create({
        multiLine: true,
        html: true,
        message: message,
        color: "red",
        position: "top",
        timeout: 0,
        actions: [{label: "Close",},],
    });
}
