"use client"

import { useState } from 'react';
import { login } from './actions';


export default function LoginForm() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        await login(formData)
        setLoading(false)
    }

    return (
        <div className="py-20">
            <form action={handleSubmit} className="space-y-4">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <label 
                        className="block mb-2 text-lg text-df-text font-bold" 
                        htmlFor="email">Email:
                    </label>
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        className="shadow-sm bg-gray-50 border border-gray-300
                        text-df-text text-2xl rounded-lg focus:ring-primary-500
                        focus:border-primary-500 block w-full p-2.5"
                        required />

                    <label 
                        className="block mb-2 text-lg font-bold text-df-text"
                        htmlFor="password">Password:
                    </label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        className="shadow-sm bg-gray-50 border border-gray-300
                        text-df-text text-2xl rounded-lg focus:ring-primary-500
                        focus:border-primary-500 block w-full p-2.5"
                        required />
                    <div className="py-4">
                        <button disabled={loading} className="font-semibold bg-df-text px-4 py-2 rounded-lg hover:bg-blue-300">
                        {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}