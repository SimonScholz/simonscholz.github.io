/*
By default, Klaro will load the config from a global 'klaroConfig' variable. You
can change this by specifying the 'data-klaro-config' attribute on your script:
<script src="klaro.js" data-klaro-config="myConfigVariableName"
*/
export const klaroConfig = {
    // With the 0.7.0 release we introduce a 'version' paramter that will make
    // it easier for us to keep configuration files backwards-compatible in the future.
    version: 1,
    /*
    Setting 'testing' to 'true' will cause Klaro to not show the consent notice or
    modal by default, except if a special hash tag is appended to the URL (#klaro-
    testing). This makes it possible to test Klaro on your live website without
    affecting normal visitors.
    */
    testing: false,
    /*
    You can customize the ID of the DIV element that Klaro will create when starting
    up. By default, Klaro will use 'klaro'.
    */
    elementID: 'klaro',

    /*
    You can customize how Klaro persists consent information in the browser. Specify
    either cookie' (the default) or 'localStorage'.
    */
    storageMethod: 'cookie',

    /*
    You can customize the name of the cookie or localStorage entry that Klaro will
    use for storing the consent information. By default, Klaro will use 'klaro'.
    */
    storageName: 'klaro',

    /*
     If set to `true`, Klaro will render the texts given in the
     `consentModal.description` and `consentNotice.description` translations as HTML.
     This enables you to e.g. add custom links or interactive content.
     */
    htmlTexts: false,

    /*
    You can change the cookie domain for the consent manager itself. Use this if you
    want to get consent once for multiple matching domains. By default, Klaro will
    use the current domain. Only relevant if 'storageMethod' is set to 'cookie'.
    */
    // cookieDomain: '.example.com',

    /*
    You can also set a custom expiration time for the Klaro cookie. By default, it
    will expire after 30 days. Only relevant if 'storageMethod' is set to 'cookie'.
    */
    cookieExpiresAfterDays: 92,

    /*
    Defines the default state for services in the consent modal (true=enabled by
    default). You can override this setting in each service.
    */
    default: false,

    /*
    If 'mustConsent' is set to 'true', Klaro will directly display the consent
    manager modal and not allow the user to close it before having actively
    consented or declined the use of third-party services.
    */
    mustConsent: true,

    /*
    Setting 'acceptAll' to 'true' will show an "accept all" button in the notice and
    modal, which will enable all third-party services if the user clicks on it. If
    set to 'false', there will be an "accept" button that will only enable the
    services that are enabled in the consent modal.
    */
    acceptAll: true,

    /*
    Setting 'hideDeclineAll' to 'true' will hide the "decline" button in the consent
    modal and force the user to open the modal in order to change his/her consent or
    disable all third-party services. We strongly advise you to not use this
    feature, as it opposes the "privacy by default" and "privacy by design"
    principles of the GDPR (but might be acceptable in other legislations such as
    under the CCPA)
    */
    hideDeclineAll: false,

    /*
    Setting 'hideLearnMore' to 'true' will hide the "learn more / customize" link in
    the consent notice. We strongly advise against using this under most
    circumstances, as it keeps the user from customizing his/her consent choices.
    */
    hideLearnMore: false,

    /*
    Setting this to true will keep Klaro from automatically loading itself
    when the page is being loaded.
    */
    noAutoLoad: false,


    /*
    Setting 'embedded' to true will render the Klaro modal and notice without
    the modal background, allowing you to e.g. embed them into a specific element
    of your website, such as your privacy notice.
    */
    embedded: false,

    /*
    You can group services by their purpose in the modal. This is advisable
    if you have a large number of services. Users can then enable or disable
    entire groups of services instead of having to enable or disable every service.
    */
    groupByPurpose: true,

    /*
    You can customize the name of the cookie that Klaro uses for storing
    user consent decisions. If undefined, Klaro will use 'klaro'.
    */
    cookieName: 'klaro',

    /*
    You can change to cookie path for the consent manager itself.
    Use this to restrict the cookie visibility to a specific path.
    If undefined, Klaro will use '/' as cookie path.
    */
    //cookiePath: '/',

    /*
    show cookie notice as modal
    */
    noticeAsModal: false,

    /*
    You can also remove the 'Realized with Klaro!' text in the consent modal.
    Please don't do this! We provide Klaro as a free open source tool.
    Placing a link to our website helps us spread the word about it,
    which ultimately enables us to make Klaro! better for everyone.
    So please be fair and keep the link enabled. Thanks :)
    */
    disablePoweredBy: true,

    /*
    you can specify an additional class (or classes) that will be added to the Klaro `div`
    */
    additionalClass: 'klaro-simon',

    /*
    You can define the UI language directly here. If undefined, Klaro will
    use the value given in the global "lang" variable. If that does
    not exist, it will use the value given in the "lang" attribute of your
    HTML tag. If that also doesn't exist, it will use 'en'.
    */
    lang: 'en',

    translations: {
        /*
        The `zz` key contains default translations that will be used as fallback values.
        This can e.g. be useful for defining a fallback privacy policy URL.
        */
        zz: {
            privacyPolicyUrl: '/privacy-policy',
        },
        en: {
            privacyPolicy: {
                name: "privacy policy",
                text: "To learn more, please read our {privacyPolicy}."
            },
            consentModal: {
                title: "We respect your privacy",
                description: "Here you can assess and customize the services that we'd like to use on this website. You're in charge! Enable or disable services as you see fit."
            },
            consentNotice: {
                testing: "Testing mode!",
                title: "Cookie Consent",
                changeDescription: "There were changes since your last visit, please renew your consent.",
                description: "Hi! Could we please enable some additional services for {purposes}? You can always change or withdraw your consent later.",
                learnMore: "Let me choose"
            },
            purposes: {
                functional: {
                    title: "Service Provision",
                    description: "Service to store consent decisions."
                },
                analytics: {
                    title: "Analytics",
                    description: "These services process information to help us improve this website."
                }
            },
            purposeItem: {
                service: "Manage user consent and preferences for third party services.",
                services: "Analytics services that help us to improve our website."
            },
            ok: "Accept all",
            save: "Save",
            decline: "I decline",
            close: "Close",
            acceptAll: "Accept all",
            acceptSelected: "Accept selected",
            service: {
                disableAll: {
                    title: "enable or disable all services",
                    description: "Use this switch to enable or disable all services."
                },
                optOut: {
                    title: "(opt-out)",
                    description: "This services is loaded by default (but you can opt out)"
                },
                required: {
                    title: "(always required)",
                    description: "This services is always required"
                },
                purposes: "Processing purposes",
                purpose: "Processing purpose"
            },
            contextualConsent: {
                description: "Do you want to load external content supplied by {title}?",
                acceptOnce: "Yes",
                acceptAlways: "Always"
            }
        },
    },
    /*
    Here you specify the third-party services that Klaro will manage for you.
    */
    services: [
        {
            /*
            Each service must have a unique name. Klaro will look for HTML elements with a
            matching 'data-name' attribute to identify elements that belong to this service.
            */
            name: 'Klaro.js',
            /*
            Translations belonging to this service go here. The key `zz` contains default
            translations that will be used as a fallback if there are no translations
            defined for a given language.
            */
            translations: {
                en: {
                    description: "This service is used to manage user consent and preferences for third party services used on this website."
                },
            },
            /*
            The purpose(s) of this service that will be listed on the consent notice. Do not
            forget to add translations for all purposes you list here.
            */
            purposes: ['functional'],

            cookies: [
                /*
                This rule will match all cookies named 'piwik_ignore' that are set on the path
                '/' on the current domain
                */
                'klaro',
            ],
            /*
            If 'required' is set to 'true', Klaro will not allow this service to be disabled
            by the user. Use this for services that are always required for your website to
            function (e.g. shopping cart cookies).
            */
            required: true,

            /*
            If 'optOut' is set to 'true', Klaro will load this service even before the user
            has given explicit consent. We strongly advise against this.
            */
            optOut: false,

            /*
            If 'onlyOnce' is set to 'true', the service will only be executed once
            regardless how often the user toggles it on and off. This is relevant e.g. for
            tracking scripts that would generate new page view events every time Klaro
            disables and re-enables them due to a consent change by the user.
            */
            //onlyOnce: true,
        },
        {
            name: 'google-tag-manager',
            /*
            The purpose(s) of this service that will be listed on the consent notice. Do not
            forget to add translations for all purposes you list here.
            */
            purposes: ['analytics'],
            onAccept: `
                // we notify the tag manager about all services that were accepted. You can define
                // a custom event in GTM to load the service if consent was given.
                for(let k of Object.keys(opts.consents)){
                    if (opts.consents[k]){
                        let eventName = 'klaro-'+k+'-accepted'
                        dataLayer.push({'event': eventName})
                    }
                }
                // if consent for Google Analytics was granted we enable analytics storage
                if (opts.consents[opts.vars.googleAnalyticsName || 'google-analytics']){
                    console.log("Google analytics usage was granted")
                    gtag('consent', 'update', {'analytics_storage': 'granted'})
                }
                // if consent for Google Ads was granted we enable ad storage
                if (opts.consents[opts.vars.adStorageName || 'google-ads']){
                    console.log("Google ads usage was granted")
                    gtag('consent', 'update', {'ad_storage': 'granted'})
                }
            `,
            onInit: `
                // initialization code here (will be executed only once per page-load)
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments)}
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'})
                gtag('set', 'ads_data_redaction', true)
            `,
            onDecline: `
                // initialization code here (will be executed only once per page-load)
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments)}
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied'})
                gtag('set', 'ads_data_redaction', true)
            `,
            vars: {
                googleAnalytics: 'google-analytics'
            }
        },
        {
            // In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
            name: 'google-analytics',
            purposes: ['analytics'],
            cookies: [
                /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
            ],
        }
    ],

    /*
    You can define an optional callback function that will be called each time the
    consent state for any given service changes. The consent value will be passed as
    the first parameter to the function (true=consented). The `service` config will
    be passed as the second parameter.
    */
    /* callback: function (consent, service) {
        console.log(
            'User consent for service ' + service.name + ': consent=' + consent
        );
    },*/
};
