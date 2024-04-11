export interface HandleClick {
    home: () => void
    about: () => void
}

export interface Menu {
    title: string
    navigate: keyof HandleClick
}