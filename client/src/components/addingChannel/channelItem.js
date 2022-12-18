import styled from "styled-components";

const Item = styled.li`
border: 1px solid #ccc;
border-radius: 10px;
margin-bottom: 20px;
padding: 20px;
display: flex;

.image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.name {
    color: #333;
    font-weight: bold;
}

button {
    width: 70px;
    height: 40px;
    border: 1px solid #333;
    padding: 10px;
    color: #333;
    margin-left: auto;

    &.hover {
        background-color: #402596;
        color: white;
    }

}
`;

export default function ChannelItem ({onJoin, channel}) {
    return (
        <Item>
            <div className="image">
                <img src={channel?.data?.image} alt=""/>
            </div>
            <div>
                <span className="name">{channel?.data?.name}</span>
                <p className="desc">{channel?.data?.desc || "No description"}</p>
            </div>
            <button onClick={() => {
                onJoin(channel?.id)
            }}>Join</button>
        </Item>
    );
}