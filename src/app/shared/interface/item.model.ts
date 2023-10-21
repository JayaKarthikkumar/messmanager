export interface Item {
    id: number;
    item_name: string;
    quantity: number;
    price: number;
    image_src: string;
    is_item_of_day?: boolean;
}