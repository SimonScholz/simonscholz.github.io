const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

export function useFadeIn(elementsCallback: () => Element[]) {
  onMounted(() => {
    elementsCallback().forEach((element) => {
      observer.observe(element)
    })
  })
  onUnmounted(observer.disconnect)
}
