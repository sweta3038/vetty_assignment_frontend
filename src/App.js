import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./styles.css";

const App = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem("jiraLists"));
        if (storedLists) setLists(storedLists);
    }, []);

    useEffect(() => {
        localStorage.setItem("jiraLists", JSON.stringify(lists));
    }, [lists]);

    return (
        <div className="app">
            <Board lists={lists} setLists={setLists} />
        </div>
    );
};

export default App;