/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	docsSidebar: [
		"intro",
		"getting-started",
		"installation",
		{
			type: "category",
			label: "核心概念",
			items: [
				"core-concepts/projection",
				"core-concepts/camera",
				"core-concepts/layers",
				"core-concepts/events",
			],
		},
		{
			type: "category",
			label: "图层系统",
			items: [
				"layers/tile-layer",
				"layers/vector-layer",
				"layers/geojson-layer",
				"layers/image-layer",
				"layers/wind-layer",
				"layers/heatmap-layer",
				"layers/overlay-layer",
				"layers/canvas-layer",
			],
		},
		{
			type: "category",
			label: "高级功能",
			items: [
				"advanced/data-driven-styles",
				"advanced/spatial-query",
				"advanced/animations",
				"advanced/performance",
			],
		},
	],

	apiSidebar: [
		"api/overview",
		"api/map-engine",
		"api/camera",
		"api/renderer",
		{
			type: "category",
			label: "图层 API",
			items: [
				"api/layers/layer",
				"api/layers/tile-layer",
				"api/layers/vector-layer",
				"api/layers/geojson-layer",
				"api/layers/image-layer",
				"api/layers/wind-layer",
				"api/layers/heatmap-layer",
				"api/layers/overlay-layer",
				"api/layers/canvas-layer",
			],
		},
		{
			type: "category",
			label: "工具类 API",
			items: [
				"api/utils/projection",
				"api/utils/vec2",
				"api/utils/style-function",
				"api/utils/spatial-query",
				"api/utils/event-emitter",
				"api/utils/webgl-utils",
				"api/utils/text-renderer",
				"api/utils/loader",
				"api/utils/resource-manager",
			],
		},
	],

	examplesSidebar: [
		"examples/overview",
		"examples/basic",
		"examples/tile-layer",
		"examples/vector-layer",
		"examples/geojson-layer",
		"examples/image-layer",
		"examples/wind-layer",
		"examples/heatmap-layer",
		"examples/overlay-layer",
		"examples/combined",
	],
};

export default sidebars;
