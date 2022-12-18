import { ChannelList } from 'stream-chat-react';
import styled from 'styled-components';
import Loader from "react-js-loader";
const Container = styled.div`
    width: 100%;
    .loading-text {
        background: #333;
        padding: 20px;
        font-size: 14px;
    }
    .loading-text {
        color: #ccc;
    }
`

export default function ChannelListContainer (loading, children) {
    // const loadingText = "Channels loading";

    return (
        <Container>
            {loading?<div><div style={{height:"30vh", width:"75vw"}}></div><Loader  type="spinner-cub" bgColor={"#402596"} title={"Loading Channels"} color={"#402596"} size={70} /></div>
       :children}
        </Container>
    );
}