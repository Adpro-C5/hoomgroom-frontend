import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 } from "uuid";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = formData.get("fileName") as string;

  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201, filename: filename });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};