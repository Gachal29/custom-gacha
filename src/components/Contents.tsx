"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Contents: NextPage = () => {
  const [contentTexts, setContentTexts] = useState([""] as Array<string>);

  useEffect(() => {
    console.log(contentTexts);
  }, [contentTexts])

  const handleChangeContentText = (value: string, idx: number) => {
    setContentTexts(
      contentTexts.map((text, i) => {
        if (i === idx) {
          return value;
        }
        return text;
      })
    );
  }

  const handleAddContent = () => {
    setContentTexts(contentTexts.concat([""]));
  }

  const handleDeleteContent = (idx: number) => {
    setContentTexts(
      contentTexts.filter((text, i) => i !== idx)
    );
  }

  return (
    <>
      <div id="contents" className="flex flex-col">
        {contentTexts.map((text: string, idx: number) => (
          <div id={`content_${idx+1}`} key={idx+1} className="flex">
            <input
              type="text"
              name={`content_${idx+1}`}
              className={clsx("mb-2 input input-bordered w-full", contentTexts.length > 1 && "mr-2")}
              value={text}
              onChange={(e) => handleChangeContentText(e.target.value, idx)}
              required
            />
            {contentTexts.length > 1 &&
              <button
                type="button"
                onClick={() => handleDeleteContent(idx)}
                className="px-2 btn btn-error btn-outline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"/></svg>
              </button>
            }
          </div>
        ))}
      </div>
      <input type="number" name="contents_num" value={contentTexts.length} hidden />
      <button type="button" onClick={handleAddContent} className="btn btn-outline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <line x1="12" x2="12" y2="24" strokeWidth="4"/>
          <line y1="12" x2="24" y2="12" strokeWidth="4"/>
        </svg>
        <span>新しいコンテンツ追加する</span>
      </button>
    </>
  )
}

export default Contents;
