import {writable, readable, type Writable} from "svelte/store"
import type {Paginator, UserData, SingleUserData} from "@/data/types";

// writable

export const toast = writable({
    show: false,
    messages: [] as string[],
    timeout: 1000,
})

let timeoutShowToast: number
toast.subscribe((toastStore)=> {
    if (!toastStore.show)
        return clearInterval(timeoutShowToast)

    if (timeoutShowToast) clearInterval(timeoutShowToast)

    timeoutShowToast = setTimeout(()=> {
        toast.update((toast)=> {
            toast.show = false
            toast.messages = []
            return toast
        })
    }, 2500)
})

export const usersData: Writable<UserData | {}> = writable({})

export const singleUserData: Writable<SingleUserData | {}> = writable({})

export const showLoading = writable(false)

export const paginator: Writable<Paginator> = writable({})

export const currentPage = writable(1)

export const showModal = writable(false)

// readable

export const mousePosition = readable({x:0, y:0}, (set) => {
    document.body.addEventListener("mousemove", move);

    function move(event: MouseEvent): void {
        set({
            x: event.clientX,
            y: event.clientY,
        });
    }

    return () => {
        document.body.removeEventListener("mousemove", move);
    }
})
