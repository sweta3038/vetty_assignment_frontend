import React from "react";
import Card from "./Card";

const List = ({ list, lists, setLists, deleteList }) => {
    const addCard = () => {
        const title = prompt("Enter card title:");
        const desc = prompt("Enter card description:");
        if (!title || !desc) return;
        
        const newCard = { id: Date.now(), title, desc, createdAt: new Date().toISOString() };
        const updatedLists = lists.map(l =>
            l.id === list.id ? { ...l, cards: [...l.cards, newCard].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) } : l
        );
        setLists(updatedLists);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const cardData = JSON.parse(e.dataTransfer.getData("card"));
        if (!cardData) return;
        
        const updatedLists = lists.map(l => {
            if (l.id === cardData.sourceListId) {
                return { ...l, cards: l.cards.filter(card => card.id !== cardData.card.id) };
            }
            if (l.id === list.id) {
                return { ...l, cards: [...l.cards, cardData.card].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) };
            }
            return l;
        });

        setLists(updatedLists);
    };

    return (
        <div className="list" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            <div className="list-header">
                <h3>{list.title}</h3>
                <button className="delete-btn" onClick={() => deleteList(list.id)}>X</button>
            </div>
            <div className="cards">
                {list.cards.map(card => (
                    <Card key={card.id} card={card} listId={list.id} lists={lists} setLists={setLists} />
                ))}
            </div>
            <button className="add-card-btn" onClick={addCard}>+ Add Card</button>
        </div>
    );
};

export default List;
