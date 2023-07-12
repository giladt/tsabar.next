import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import { Button } from "@/components/button";
import { TFields, TValue } from "@/components/forms/inquiry";
import dayjs from "dayjs";

const MESSAGE_MAX_LENGTH = 2500;

export const SendConfirmation = ({
  value,
  handleChange,
  setResponse,
}: {
  value: { [name in TFields]: TValue };
  handleChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setResponse: Dispatch<SetStateAction<number | null>>;
}) => {
  const [startDate, endDate] = value.date_inquiry.text.split("|");
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleSendInquiry = async () => {
    let body: { [key in keyof typeof value]?: string } = {};
    Object.entries(value).forEach((entry) => {
      body[entry[0] as keyof typeof value] = entry[1].text;
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };

    setIsLoading(true);
    const res = await fetch("/api/actions/inquiry", options);
    setIsLoading(false);

    setResponse(res.status);
  };

  return (
    <>
      <h3>You are about to send the following inquiry details:</h3>
      <div className="text-left">
        <p>Contract begin: {dayjs(startDate).format("DD/MM/YYYY")}</p>
        <p>Contract end: {dayjs(endDate).format("DD/MM/YYYY")}</p>
        <p>
          Main tenant: {value.name_first.text} {value.name_last.text}
        </p>
        <p>Email Address: {value.email.text}</p>
        <p>
          {value.tenants.text} tenant{value.tenants.text !== "1" && "s"}
        </p>
        {handleChange && (
          <fieldset className="flex flex-col mt-4">
            <label htmlFor="comment" className="flex justify-between">
              <span>Add a personal message (optional)</span>
              <span>
                <small>
                  {value.comment.text.length}/{MESSAGE_MAX_LENGTH}
                </small>
              </span>
            </label>
            <textarea
              id="comment"
              name="comment"
              title="Add comment"
              className="border-2 rounded-md p-2 hover:border-primary-dark focus:border-primary-dark"
              rows={3}
              value={value.comment.text}
              onChange={handleChange}
              maxLength={MESSAGE_MAX_LENGTH}
            ></textarea>
          </fieldset>
        )}
      </div>
      <Button
        onClick={handleSendInquiry}
        title="Confirm inquiry submission"
        isLoading={isLoading}
      >
        Confirm
      </Button>
    </>
  );
};
