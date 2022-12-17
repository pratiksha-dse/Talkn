import styled from "styled-components";
import React,{ useState } from "react";
import BrowseChannel from "./browseChannel";
import CreateChannel from "./createChannel";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;

    .tabs {
        padding: 20px 0;
        border-bottom: 1px solid #333333;

        button {
            margin-right: 20px;
            background: none;
            padding: 10px 20px;
            cursor: pointer;
            border: 1px solid #333333;

            &.active {
                background: #333333;
                color: white;
            }
        }

    }
`;


const TABS = [
    {
        name: "Browse",
        id: "browse"
    },
    {
        name: "Create",
        id: 'create'
    }
]

export default function AddingChannel ({onClose}) {
    const [activeTab, setActiveTab] = useState(TABS[0].id);

    return (
        <Container>
            <div className="tabs">
                <button onClick={onClose}>Close</button>
                {TABS.map((tab) => {
                    return (
                    <button className={activeTab===tab.id? "active" : undefined} key={tab.id} onClick={() => setActiveTab(tab.id)}>
                        {tab.name}
                    </button> );
                })}
            </div>
            {activeTab==='browse' && <BrowseChannel onClose={onClose}/>}
            {activeTab==='create'&& <CreateChannel onClose={onClose}/>}
        </Container>
    );

}