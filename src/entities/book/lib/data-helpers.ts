export const convertDateFormat = (date: string): string => {
    return date.split('-').reverse().join('.')
}