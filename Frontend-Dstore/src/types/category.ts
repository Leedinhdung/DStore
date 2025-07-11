export interface ICategory {
	id: number;
	children: ICategory[];
	name: string;
	slug: string;
	icon_svg: string;
}
