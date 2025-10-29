interface TableRow {
    campaign: string;
    status: "Ativa" | "Pausada" | "Rascunho";
    budget: string;
    cpa: string;
    updatedAt: string;
}
interface Props {
    rows?: TableRow[];
}
declare const __VLS_export: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    rows: TableRow[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
