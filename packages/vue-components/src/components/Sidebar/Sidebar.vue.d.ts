interface NavItem {
    label: string;
    active?: boolean;
}
interface NavGroup {
    title: string;
    items: NavItem[];
}
interface Props {
    brandName?: string;
    brandInitials?: string;
    navGroups?: NavGroup[];
    footNote?: string;
}
declare const __VLS_export: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    brandName: string;
    brandInitials: string;
    navGroups: NavGroup[];
    footNote: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
