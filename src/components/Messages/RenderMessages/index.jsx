import React from 'react';
import { useSelector } from 'react-redux';

import getTimes from '../../../Utils';
import DateItem from '../Date';
import Item from '../Item';
import NewMessage from '../NewMessage';

const RenderMessages = ({ messages }) => {
    const { user_id } = useSelector(state => state.userReducer)
    const firstNewMessageId = messages?.find(msg => !msg.viewed && msg.message_from !== user_id)?.message_id || null
    let { fullDate: currentFullDate } = getTimes(new Date())
    
    return (
        <div style={{"display": "flex", "flexDirection": "column"}}>
            {
                messages.length > 0 && messages.map(msg => {
                    const { fullDate: msgDate } = getTimes(msg.created_at)
                    
                    const Message = (
                        <span key={msg.message_id} id={msg.message_id} style={{"display": "flex", "flexDirection": "column"}}>
                            {currentFullDate !== msgDate ? <DateItem date={msgDate} /> : <></>}
                            {firstNewMessageId === msg.message_id ? <NewMessage /> : <></>}
                            <Item message={msg} />
                        </span>
                    )
                    currentFullDate = currentFullDate !== msgDate ? msgDate : currentFullDate
                    return Message
                })
            }
        </div>
    );
}

export default React.memo(RenderMessages);
