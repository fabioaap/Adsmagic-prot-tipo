import type { StoryObj } from "@storybook/vue3";
declare const meta: Meta<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<{
        variant?: "primary" | "secondary" | "ghost";
        size?: "sm" | "md";
        disabled?: boolean;
    }> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        variant: "primary" | "secondary" | "ghost";
        size: "sm" | "md";
        disabled: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{
        variant?: "primary" | "secondary" | "ghost";
        size?: "sm" | "md";
        disabled?: boolean;
    }> & Readonly<{}>, {}, {}, {}, {}, {
        variant: "primary" | "secondary" | "ghost";
        size: "sm" | "md";
        disabled: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<{
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    disabled?: boolean;
}> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    variant: "primary" | "secondary" | "ghost";
    size: "sm" | "md";
    disabled: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        leading?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        trailing?: (props: {}) => any;
    };
})>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Ghost: Story;
export declare const Small: Story;
export declare const Disabled: Story;
export declare const WithSlots: Story;
