import React from "react";
import List from "./List";

const Board = ({ lists, setLists }) => {
    const addList = () => {
        const newList = {
            id: Date.now(),
            title: `List ${lists.length + 1}`,
            cards: [],
        };
        setLists([...lists, newList]);
    };

    const deleteList = (id) => {
        setLists(lists.filter(list => list.id !== id));
    };

    return (
        <div className="board">
            {lists.map(list => (
                <List key={list.id} list={list} lists={lists} setLists={setLists} deleteList={deleteList} />
            ))}
            <button className="add-list-btn" onClick={addList}>+ Add List</button>
        </div>
    );
};

export default Board;