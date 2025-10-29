interface Props {
    workspaceName?: string;
    workspaceDescription?: string;
    avatarInitials?: string;
    statusLabel?: string;
    campaignsCount?: string;
    conversionsRate?: string;
    integrationsCount?: string;
}
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    actions?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    workspaceName: string;
    workspaceDescription: string;
    avatarInitials: string;
    statusLabel: string;
    campaignsCount: string;
    conversionsRate: string;
    integrationsCount: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
