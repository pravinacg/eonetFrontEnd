import React from 'react'

const Events = ({contacts}) => {
    return (
        <div>
            <center><h1>Events List</h1></center>
            {contacts.map((contact) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{contact.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{contact.id}</h6>
                        <p class="card-text">{contact.link}</p>
                        <h6 class="card-categories mb-2 text-muted">{contact.categories[0].title}</h6>
                    </div>
                </div>
                
            ))}
        </div>
        
    )
};

export default Events