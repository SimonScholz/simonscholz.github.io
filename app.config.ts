export default defineAppConfig({
    cover: '/cover.png',
    socials: {
        twitter: 'simonscholz',
        github: 'simonscholz'
    },
    prose: {
        h1: {
            icon: 'carbon:link'
        }
    },
    nuxtIcon: {
        aliases: {
            'dark-mode': 'ph:moon-bold',
            'light-mode': 'ph:sun-bold'
        }
    },
    contentMermaid: {
        enabled: true,
        /**
         * @default 'default'
         * @description 'default' or '@nuxtjs/color-mode'
         */
        color: 'default',
        spinnerComponent: 'DAnimationSpinner'
    }
})
