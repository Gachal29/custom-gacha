import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { contentsShuffle } from "utils/contentsShuffle";
import Contents from "../components/Contents";

const Home: NextPage = () => {
  const gachal = async (formData: FormData) => {
    "use server";
    const mode = formData.get("mode");
    const contentsNum = Number(formData.get("contents_num"));
    const contents = [] as Array<string>;
    for (let contentId=1; contentId<=contentsNum; contentId++) {
      const data = formData.get(`content_${contentId}`) as string;
      if (data) {
        contents.push(data);
      }
    }

    if (mode) {
      cookies().set("gacha.mode", "sort", {
        path: "/result",
        maxAge: 1,
      });
      cookies().set("gacha.result", JSON.stringify(contentsShuffle(contents)), {
        path: "/result",
        maxAge: 1,
      });
    } else {
      const result = contents[Math.floor(Math.random() * contents.length)];
      cookies().set("gacha.mode", "lottery", {
        path: "/result",
        maxAge: 1,
      });
      cookies().set("gacha.result", JSON.stringify(result), {
        path: "/result",
        maxAge: 1,
      });
    }
    redirect("/result");
  }

  return (
    <main>
      <form action={gachal} className="mx-auto max-w-lg">
        <h2 className="mb-4 text-xl font-bold">ガチャモードを設定する</h2>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">抽選</span>
            <input type="checkbox" name="mode" className="toggle toggle-primary" defaultChecked />
            <span className="label-text">ソート</span>
          </label>
        </div>
        <div className="mt-6 flex flex-col">
          <h2 className="mb-4 text-xl font-bold">コンテンツを設定する</h2>
          <Contents />
        </div>
        <div className="text-center">
          <button type="submit" className="mt-4 btn btn-lg btn-accent">ガチャる</button>
        </div>
      </form>
    </main>
  )
}

export default Home
