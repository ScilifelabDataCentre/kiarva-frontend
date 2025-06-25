"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import { backendAPI, BODY_CLASSES } from "@/constants";
import axios from "axios";
import { setCookie, hasCookie, deleteCookie } from "cookies-next";
import { Button } from "@/components/ui/button";

export default function PasswordPage(): ReactElement {
  const [inputField, setInputField] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");

  const backend_password_uri: string = backendAPI + "checkapikey";

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setInputField(e.target.value);
  }

  async function handleSubmit(): Promise<void> {
    const config = {
      headers: {
        "X-api-key": inputField,
      },
    };

    await axios
      .get(backend_password_uri, config)
      .then((response) => {
        console.log(response);
        setCorrectPassword("Password correct, unlocking full functionality.");
        setCookie("password", inputField, { maxAge: 365 * 24 * 60 * 60 });
      })
      .catch(() => {
        setCorrectPassword(
          "Password incorrect, try again or continue with restricted version."
        );
      });
  }

  function handleReset(): void {
    deleteCookie("password");
  }

  return (
    <div className={BODY_CLASSES}>
      {!hasCookie("password") ? (
        <div className="flex flex-col w-full max-w-xs gap-4">
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input bg-white input-bordered border-neutral"
            defaultValue={inputField}
            onChange={handleChange}
            required
          />
          <Button variant="default" size="default" onClick={handleSubmit}>
            Submit
          </Button>
          <p>{correctPassword}</p>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-xs gap-4">
          <p>Password saved.</p>
          <Button variant="default" size="default" onClick={handleReset}>
            Reset password
          </Button>
        </div>
      )}
    </div>
  );
}
