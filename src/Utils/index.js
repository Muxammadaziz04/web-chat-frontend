const getMonthInString = (index) => {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return month[index]
}

const getTimes = (date) => {
    if(!date) return {}

    date = new Date(date)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentTimeZone = Math.abs(currentDate.getTimezoneOffset() / 60)
    const dateTimeZone = Math.abs(date.getTimezoneOffset() / 60)

    const year = date.getFullYear() || ''
    const month = date.getMonth() + 1 || ''
    const day = date.getDate() || ''
    const hour = date.getHours() + (currentTimeZone - dateTimeZone) || ''
    const minutes = date.getMinutes() || ''
    const time = date.toLocaleTimeString().slice(0, 5) || ''

    const monthInStr = getMonthInString(date.getMonth()) || ''
    const fullDate = `${day} ${monthInStr} ${year === currentYear ? '' : year}` || ''

    return {
        year,
        month,
        day,
        hour,
        minutes,
        time,
        fullDate
    }
}

export default getTimes