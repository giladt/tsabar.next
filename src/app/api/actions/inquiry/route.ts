import { TFields } from "@/components/forms/inquiry";
import { mailOptions, transporter } from "@/utils/transporter";
import { NextRequest, NextResponse } from "next/server";

function instanceOfTData(object: TData): object is TData {
  return typeof object.email === "string";
}

type TData = { [name in TFields]: string };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (instanceOfTData(body)) {

      const [start, end] = body.date_inquiry.split("|");
      await transporter.sendMail({
        ...mailOptions,
        replyTo: body.email,
        subject: "New inquiry from Le-Petit-Moabit",
        text: "A new inquiry in HTML format.",
        html: `
          <div>
            <h1>New inquiry for ${body.apartment} - Le-Petit-Moabit</h1>
            <ul>
              <li>From ${body.name_first} ${body.name_last}</li>
              <li>Email: ${body.email}</li>
              <li>For ${body.tenants} tenant${parseInt(body.tenants) > 1 ? "s" : ""}</li>
              <li>From ${start} to ${end}</li>
            </ul>
            <h2>Message</h2>
            <p>${body.comment}</p>
          </div>
        `
      })
      return new Response(
        JSON.stringify(body),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse("Bad request.", { status: 400 })
    }
  }
  catch (error: unknown) {
    console.log({ error });
    return new NextResponse("Server Error.", { status: 500 })
  }
}
