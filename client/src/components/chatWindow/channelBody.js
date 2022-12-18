import styled from "styled-components";
import { ChannelHeader, MessageInput, MessageList } from "stream-chat-react";


const Container = styled.div`
    width: 100%;
    height: 82vh;
    

    .str-chat-header-livestream {
        width: 100%;
        height: 70px;
    }

    .str-chat__list {
        height: calc(100vh - 70px);
        background-color:rgba(0, 0, 0, 0.4);
        // background-image: url(https://e0.pxfuel.com/wallpapers/518/286/desktop-wallpaper-3d-abstract-colorful-doodle-drawing-small-retro-art.jpg);
        background-image: url(https://wallpaperaccess.com/full/5494980.jpg);
        background-size: cover;
        // opacity:0.5;
    }

    .str-chat__input-flat-wrapper {
        position: absolute;
        bottom: 20px;
        width: 100%;
    }

`;

export default function ChannelBody () {
    return (
        <Container>
            <ChannelHeader/>
            <MessageList/>
            <MessageInput/>
        </Container>
    );
}