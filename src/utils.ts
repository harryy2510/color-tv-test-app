export const getAvatarSource = (uri?: string) =>
    uri ? { uri } : require('../assets/blank-avatar.png')
export const getApiUrl = (endpoint: string, searchTerm?: string) =>
    `https://api.unsplash.com/${endpoint}?page=1&per_page=200&client_id=aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5${
        searchTerm ? '&query=' + searchTerm : ''
    }`
