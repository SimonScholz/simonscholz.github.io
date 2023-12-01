import * as Klaro from "klaro";

export function useKlaro() {
    onMounted(() => {
        Klaro.setup(klaroConfig)
    })
}
