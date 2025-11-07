/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_ALERT_WEBHOOK_URL?: string
    readonly REACT_APP_SLACK_WEBHOOK_URL?: string
    readonly REACT_APP_ALERT_EMAIL_TO?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}