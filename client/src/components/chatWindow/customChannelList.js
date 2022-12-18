import { ChannelList } from 'stream-chat-react';
import { useChatContext } from "stream-chat-react";
import ChannelListContainer from './channelListContainer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled.div`
    height: 100vh;
    background-color: #402596;
    padding: 20px 10px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h2{
            color: white;
            margin: 0 0 10px;
            font-size: 18px;
            font-weight:bold;
            font-family: Arial, Helvetica, sans-serif;
        }
        
    }

    .button-div {
        display: flex;

        button {
            width: 40px;
            color: white;
            font-size: 15px;
            background: none;
            border: 1px solid white;
            cursor: pointer;
            margin-right: 5px;
        }
    }

    .exit-icon {
        width: 10px;
        height: 10px;
    }
    .str-chat {
        height: max-content;
        &.str-chat-channel-list {
            float: none;
        }
    }
    .channel-list {
        width: 100%;
        &__message{
            color: white;
        }
    }
`;

const randstr = () => Math.random().toString(36).substring(7);

export default function CustomChannelList({onClickAdd, onClickExit}) {
    const {client} = useChatContext();
    const [channelListKey, setChannelListKey] = useState(randstr());
    const filters = {
        members: {$in: [client.user.id]}
    }

    useEffect(()=>{
        client.on("member.added", ()=>{
            setChannelListKey(randstr());
        })
    }, []);

    return (
        <Container>
            <div className='header'>
                <h2>Channels</h2>
                <div className='button-div'>
                    <button onClick={onClickAdd}>+</button>
                    <button onClick={onClickExit}>x</button>
                </div>
            </div>
            <ChannelList key={channelListKey} list={listPros => <ChannelListContainer {...listPros}/>} filters={filters}/>
        </Container>
    )
}