import * as React from 'react';

interface SubscriptionEmailProps {
    email: string;
}

export const SubscriptionEmail: React.FC<Readonly<SubscriptionEmailProps>> = ({
    email,
}) => (
    <div className="bg-dfNew2">
        <h1 className="text-xl">Welcome to Dragonfly Ceramics</h1>
        <p className="text-xl text-df-text">
            {`THANKS FOR SIGNING UP FOR THE NEWSLETTER. YOU WILL NOW RECEIVE UPDATES FOR DRAGONFLY CERAMICS AT ${email}`}
        </p>
    </div>
);

