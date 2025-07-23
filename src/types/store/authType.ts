export type UserSessionType = {
    email: string
    first_name: string
    last_name: string
}

export type SelectedStore = {
    id: string
    name: string
}

export type SessionType = {
    token: string
    user: UserSessionType
    selected_store: SelectedStore
}

export interface AuthenticationState  {
    session: SessionType | null
    token: string | null
}

export interface RegisterBody {
    first_name: string
    last_name: string
    email: string
    password: string
    store_name: string
    store_location: string
}

export interface LoginBody {
    email: string
    password: string
}