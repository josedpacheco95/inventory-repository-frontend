

export type ItemType = {
    unique_id: string
    name: string
    quantity: number
    location: string
    description: string
    date_added: string
}

export type ItemResponse = {
    current_page: number
    total_items: number
    data: ItemType[]
}

export type ItemBody = {
    name: string
    quantity: number
    location: string
    description: string
    store_id: string
}

export interface StateItem {
    items: ItemType[]
    item: ItemType | null
}