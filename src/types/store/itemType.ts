import type { PaginationType } from "./common"

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
    unique_id: string
    name: string
    quantity: number
    location: string
    description?: string
}

export interface StateItem {
    items: ItemType[]
    item: ItemType | null
    total_items: number
}

export interface ItemGetParams {
    search?: string
    quantity?: number
    pagination: PaginationType
}