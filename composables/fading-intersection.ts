export function useFadeIn(elementsCallback: () => Element[]) {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    }

    const disconnectCallback = ref<null | { disconnect: () => void }>(null)

    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        disconnectCallback.value = { disconnect: observer.disconnect }
        elementsCallback().forEach((element) => {
            observer.observe(element)
        })
    })
    onUnmounted(() => {
        disconnectCallback?.value?.disconnect()
    })
}