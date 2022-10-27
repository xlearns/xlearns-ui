import type { PropType } from "vue";
export const definePropType = <T>(val: any): PropType<T> => val;

export type ColSizeObject = {
	span?: number;
	offset?: number;
	pull?: number;
	push?: number;
};
export type ColSize = number | ColSizeObject;

export const colTypes = [] as const;
export const colProps = {
	tag: {
		type: String,
		default: "div",
	},
	span: {
		type: Number,
		default: 24,
	},
	offset: {
		type: Number,
		default: 0,
	},
	pull: {
		type: Number,
		default: 0,
	},
	push: {
		type: Number,
		default: 0,
	},
	xs: {
		type: [Number, Object] as PropType<ColSize>,
		default: () => {
			return {} as const;
		},
	},
	sm: {
		type: [Number, Object] as PropType<ColSize>,
		default: () => {
			return {} as const;
		},
	},
	md: {
		type: definePropType<ColSize>([Number, Object]),
		default: () => {
			return {} as const;
		},
	},
	lg: {
		type: definePropType<ColSize>([Number, Object]),
		default: () => {
			return {} as const;
		},
	},
	xl: {
		type: definePropType<ColSize>([Number, Object]),
		default: () => {
			return {} as const;
		},
	},
};

// TODO: buildProps function
