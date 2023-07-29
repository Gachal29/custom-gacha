import { NextResponse } from "next/server"
import { contentsShuffle } from "utils/contentsShuffle"


export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  const contents = JSON.parse(searchParams.get("contents")??"")
  if (!contents) {
    return NextResponse.json({ "error": "Please input parameter 'contents' Array<string>." })
  }

  let result: Array<string> = []
  try {
    result = contentsShuffle(contents)
  } catch (error) {
    NextResponse.json({ "error": "Prease input parameter 'contents' Array<string>." })
  }

  const mode = searchParams.get("mode")
  switch (mode) {
    case "sort":
      return NextResponse.json({"result": result})

    default:
      // mode = lotterの時の処理
      return NextResponse.json({"result": [result[0]]})
  }
}
