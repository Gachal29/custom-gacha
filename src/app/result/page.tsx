import { NextPage } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import clsx from "clsx";

const ResultPage: NextPage = () => {
  const mode = cookies().get("gacha.mode")?.value;

  let lotteryResult = "";
  let sortResult = [] as Array<string>;
  switch (mode) {
    case "lottery":
      lotteryResult = cookies().get("gacha.result")?.value ?? "";
      if (lotteryResult) {
        lotteryResult = lotteryResult.slice(1, -1);
      }
      break;
    case "sort":
      sortResult = JSON.parse(cookies().get("gacha.result")?.value ?? "[]");
      break;
    default:
      redirect("/");
  }

  return (
    <>
      <Link href="/" className="link link-secondary">← トップページへ戻る</Link>

      <h1 className="my-4 text-2xl text-center font-bold">{clsx("ガチャ結果", mode === "lottery" && "抽選", mode === "sort" && "ソート")}</h1>

      {mode === "lottery" &&
        <div className="lottery-height flex justify-center items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">{lotteryResult}</h1>
        </div>
      }

      {mode === "sort" &&
        <ul className="mx-auto max-w-lg">
          {sortResult.map((value, idx) => (
            <li key={idx} className="my-3 text-3xl flex">
              <div className="w-8 mr-2">{idx+1}.</div>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default ResultPage;
