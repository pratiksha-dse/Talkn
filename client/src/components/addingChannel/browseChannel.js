import styled from "styled-components";
import React,{ useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import ChannelItem from "./channelItem";
import Loader from "react-js-loader";
const Container = styled.div`
   display: flex;

   ul {
    width: 100%;
    padding: 0;
   }
`;


export default function BrowseChannel ({onClose}) {
    const {client, setActiveChannel} = useChatContext();
    const [channels, setChannels] = useState([]);
    const [loadingChannels, setLoadingChannels] = useState(true);

    useEffect(() => {
      const fetchChannels = async () => {
        const response = await client.queryChannels();
        console.log(response);
        const filterChannels = response.filter(c => c.type==='team');
        setChannels(filterChannels);
        setLoadingChannels(false);

      }

      fetchChannels();

    }, []);

    const joinChannel = (id) => {
        const channel = channels.find(c => c.id===id);
        if(!channel){
            return onClose();
        }
        channel.addMembers([client.user.id]);
        setActiveChannel(channel);
        onClose();
    }
    
    return (
        <Container>
            {loadingChannels?(<div><div style={{height:"30vh", width:"75vw"}}></div><Loader  type="spinner-cub" bgColor={"#402596"} title={"Loading Channels"} color={"#402596"} size={70} /></div>): (
                <ul>
                {channels.map((c) => {
                    return (
                        <ChannelItem key={c.cid} onJoin={joinChannel} channel={c}/>
                    );
                })}
            </ul>)
            }
        </Container>
    );

}