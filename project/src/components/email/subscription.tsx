import * as React from 'react';

interface SubscriptionEmailProps {
    name: string;
}

export const SubscriptionEmail: React.FC<Readonly<SubscriptionEmailProps>> = ({
    name,
}) => (
    <div>
        <h1>Welcome, {name}!</h1>
        <p>You have been added to Dragonfly Ceramics mailing list.</p>
        <p>You will receive occasional updates on our product offerings.</p>
        <p>Thanks for subscribing!</p>
    </div>
);

