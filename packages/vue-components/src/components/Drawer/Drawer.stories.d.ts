import type { Meta, StoryObj } from "@storybook/vue3";
import DsDrawer from "./Drawer.vue";
declare const meta: Meta<typeof DsDrawer>;
export default meta;
type Story = StoryObj<typeof DsDrawer>;
export declare const Default: Story;
export declare const Overlay: Story;
export declare const Closed: Story;
