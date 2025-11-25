// API call should probably be done on server for security, but this component is not officially part of the app
// so not sure if we need to prioritize changing it.

"use client";

import { ChangeEvent, ReactElement, useState, useEffect } from "react";
import { backendAPI, BODY_CLASSES } from "@/constants";
import axios from "axios";
import { setCookie, hasCookie, deleteCookie } from "cookies-next";
import { Button } from "@/components/ui/button";

export default function PasswordPage(): ReactElement {
  const [inputField, setInputField] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");
  const [hasPasswordCookie, setHasPasswordCookie] = useState(false);

  const backend_password_uri: string = backendAPI + "checkapikey";

  useEffect(() => {
    setHasPasswordCookie(hasCookie("password"));
  }, []);

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
        setHasPasswordCookie(true);
      })
      .catch(() => {
        setCorrectPassword(
          "Password incorrect, try again or continue with restricted version."
        );
      });
  }

  function handleReset(): void {
    deleteCookie("password");
    setHasPasswordCookie(false);
  }

  return (
    <main className={BODY_CLASSES}>
      {!hasPasswordCookie ? (
        <section aria-labelledby="password-form-heading">
          <h1 id="password-form-heading" className="sr-only">
            Enter password
          </h1>
          <form
            className="flex flex-col w-full max-w-xs gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label htmlFor="password-input" className="sr-only">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              name="password"
              placeholder="Type here"
              className="input bg-white input-bordered border-neutral"
              value={inputField}
              onChange={handleChange}
              required
              aria-describedby="password-status"
            />
            <Button type="submit" variant="default" size="default">
              Submit
            </Button>
            {correctPassword && (
              <p id="password-status" role="status" aria-live="polite">
                {correctPassword}
              </p>
            )}
          </form>
        </section>
      ) : (
        <section aria-labelledby="password-saved-heading">
          <h1 id="password-saved-heading" className="sr-only">
            Password saved
          </h1>
          <div className="flex flex-col w-full max-w-xs gap-4">
            <p>Password saved.</p>
            <Button variant="default" size="default" onClick={handleReset}>
              Reset password
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
