const openBtn = () => ({
    type: 'open'
})

const closeBtn = () => ({
    type: 'close'
})

const newMessage = (payload) => ({
    type: "newMessage",
    payload
})

export default {
    openBtn, closeBtn, newMessage
}