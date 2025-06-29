import type { Category, Type } from "../../types";

export interface ProductHeaderProps {
    title: string;
    image: string;
    categories: Category[];
    types?: Type[]
}