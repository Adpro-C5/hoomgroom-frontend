import { NextResponse } from "next/server";
import path from "path";
import { rm } from "fs/promises";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();

  const imagepath = formData.get('filePath') as string
  console.log(imagepath);
  try {
    await rm(
      path.join(process.cwd(), "public/uploads/" + imagepath)
    );
    return NextResponse.json({ Message: "Success", status: 201, filename: imagepath});
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({Message: "Not Found", status: 404});
  }
};
