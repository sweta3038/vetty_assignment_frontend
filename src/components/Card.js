import React from "react";

const Card = ({ card, listId, lists, setLists }) => {
    const deleteCard = () => {
        const updatedLists = lists.map(l => 
            l.id === listId ? { ...l, cards: l.cards.filter(c => c.id !== card.id) } : l
        );
        setLists(updatedLists);
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData("card", JSON.stringify({ card, sourceListId: listId }));
    };

    return (
        <div className="card" draggable onDragStart={handleDragStart}>
            <div className="card-header">
                <h4>{card.title}</h4>
                <button className="delete-btn" onClick={deleteCard}>X</button>
            </div>
            <p>{card.desc}</p>
            <small>{new Date(card.createdAt).toLocaleString()}</small>
        </div>
    );
};

export default Card;
