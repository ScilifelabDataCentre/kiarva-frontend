'use client';

import { ChangeEvent, ReactElement, useState } from 'react';
import { BODY_CLASSES } from '@/constants'
import axios from 'axios';

export default function PasswordPage(): ReactElement {
    const [inputField, setInputField] = useState("");

    const backend_password_uri: string = process.env.BACKEND_API_URL + 'passvalidation';

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) { 
        setInputField(e.target.value);
    }

    async function handleSubmit(): Promise<void> {
        await axios
            .get(backend_password_uri)
            .then((response) => {
                //
            })
            .catch((response) => console.log(response.error));
        console.log("The password is:" + inputField);
    }

    return (
        <div className={BODY_CLASSES}>
            <div className="flex flex-col">
                <input 
                    type="text"
                    name="password"
                    placeholder="Type here" 
                    className="input bg-white input-bordered border-neutral w-full max-w-xs"
                    defaultValue={inputField} 
                    onChange={handleChange} 
                    required 
                />
                <button onClick={handleSubmit} className="btn btn-wide bg-fuchsia-950 text-white hover:bg-fuchsia-800 active:bg-fuchsia-900 focus:outline-none focus:ring focus:ring-fuchsia-300">Submit</button>
            </div>
        </div>
    );
}