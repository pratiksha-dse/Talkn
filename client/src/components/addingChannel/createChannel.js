import styled from "styled-components";
import React,{ useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

const Form = styled.form`
    border: 1px solid #999;
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;

    .input-group {
        margin-bottom: 20px;

        label {
            display: block;
            color: #333;
            margin-bottom: 10px;
            font-size: 15px;
            font-family: Arial, Helvetica, sans-serif;
        }

        input,textarea {
            padding: 15px;
            width: 100%;
            background: transparent;
            border: 1px solid #999;
            color: #333;
            font-size: 17px;
            font-family: Arial, Helvetica, sans-serif;
        }

        .submit {
            button {
                padding: 20px;
                text-align: center;
                background-color: black;
                color: white;
                width: 100%;
            }
        }
    }

`;

export default function CreateChannel ({onClose}) {
    const {client, setActiveChannel} = useChatContext();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [desc, setDesc] = useState('');

    const createChannel = (e) => {
        e.preventDefault();

        const channelID = name.replace(/\s/g, '-').toLowerCase();
        const channel = client.channel('team', channelID, {
            name,
            image,
            desc,
            members: [client.user.id]
        });
        setActiveChannel(channel);
        onClose();
    }
    
    return (
        <Form onSubmit={createChannel}>
            <div className="input-group">
                <label htmlFor="name">Channel Name</label>
                <input id="name" onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className="input-group">
                <label htmlFor="image">Channel Image URL</label>
                <input id="image" onChange={(e)=>{setImage(e.target.value)}}/>
            </div>
            <div className="input-group">
                <label htmlFor="desc">Description</label>
                <textarea id="desc" onChange={(e)=>{setDesc(e.target.value)}}/>
            </div>
            <div className="submit">
                <button type="submit">Create Channel</button>
            </div>
        </Form>
    );

}