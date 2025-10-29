interface SummaryCard {
    label: string;
    value: string;
    delta: string;
    tone: "positive" | "negative" | "neutral";
}
interface Props {
    cards?: SummaryCard[];
}
declare const __VLS_export: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    cards: SummaryCard[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
