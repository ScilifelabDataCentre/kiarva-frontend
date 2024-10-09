'use client';

import { ChangeEvent, ReactElement, useState } from 'react';
import { backendAPI, BODY_CLASSES } from '@/constants'
import axios from 'axios';

export default function PasswordPage(): ReactElement {
    const [inputField, setInputField] = useState("");
    const [correctPassword, setCorrectPassword] = useState("");

    const backend_password_uri: string = backendAPI + 'checkapikey';

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) { 
        setInputField(e.target.value);
    }

    async function handleSubmit(): Promise<void> {
        console.log("wot");
        const config = {
            headers: {
                'X-api-key': inputField,
            }
          }

        await axios
            .get(backend_password_uri,config)
            .then((response) => {
                console.log(response);
                setCorrectPassword("Password correct, unlocking full functionality.");
            })
            .catch((response) => {
                setCorrectPassword("Password incorrect, try again or continue with restricted version.");
            });
        // console.log("The password is:" + inputField);
    }

    return (
        <div className={BODY_CLASSES}>
            <div className="flex flex-col">
                <input 
                    type="password"
                    name="password"
                    placeholder="Type here" 
                    className="input bg-white input-bordered border-neutral w-full max-w-xs"
                    defaultValue={inputField} 
                    onChange={handleChange} 
                    required 
                />
                <button onClick={handleSubmit} className="btn btn-wide bg-fuchsia-950 text-white hover:bg-fuchsia-800 active:bg-fuchsia-900 focus:outline-none focus:ring focus:ring-fuchsia-300">Submit</button>
                <p>{correctPassword}</p>
            </div>
        </div>
    );
}