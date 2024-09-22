"use client"
import { NextPage } from "next"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { contentsShuffle } from "utils/contentsShuffle"


const Home: NextPage = () => {
  const [gachaTheme, setGachaTheme] = useState("")
  const [selectedMode, setSelectedMode] = useState("")

  const initMode = "lottery"
  useEffect(() => {
    setSelectedMode(initMode)
  },[])

  const handleChangeMode = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value
    setSelectedMode(value)
  }

  const handleDeleteContent = (contentId: string) => {
    const content = document.getElementById(contentId)
    content?.remove()
  }

  const handleAddContent = () => {
    const formContents = document.getElementById("form-contents")
    if (formContents) {
      const contentIdNumber = document.querySelectorAll("#form-contents li").length + 1
      const newContent = document.createElement("li")
      newContent.setAttribute("id", `content${contentIdNumber}`)
      newContent.setAttribute("class", "flex justify-center items-center")

      const inputElem = document.createElement("input")
      inputElem.setAttribute("type", "text")
      inputElem.setAttribute("class", "input input-bordered input-primary w-full max-w-xs my-2")
      inputElem.setAttribute("placeholder", "コンテンツ")
      inputElem.required = true
      newContent.appendChild(inputElem)

      const btnElem = document.createElement("button")
      btnElem.setAttribute("type", "button")
      btnElem.setAttribute("class", "btn btn-circle btn-primary ml-2 p-2")
      btnElem.addEventListener("click", () => handleDeleteContent(`content${contentIdNumber}`))
      
      const deleteImgElem = document.createElement("img")
      deleteImgElem.setAttribute("src", "/delete-icon.svg")
      btnElem.appendChild(deleteImgElem)

      newContent.appendChild(btnElem)
      formContents.appendChild(newContent)

      inputElem.focus()
    }
  }

  const gachal = (event: FormEvent | undefined = undefined) => {
    if (event) {
      event.preventDefault()
    }

    const contentElems = document.querySelectorAll("#form-contents li input")
    if (!contentElems) {
      return
    }

    const contents: Array<string> = []
    Array.prototype.forEach.call(contentElems, contentElem => {
      contents.push(contentElem.value)
    })

    const result = contentsShuffle(contents)

    const oldResultElem = document.getElementById("result")
    if (oldResultElem) {
      oldResultElem.remove()
    }

    const resultElem = document.createElement("div")
    resultElem.setAttribute("id", "result")

    const titleElem = document.createElement("h1")
    titleElem.setAttribute("class", "text-4xl font-bold my-4")
    if (gachaTheme) {
      titleElem.textContent = `「${gachaTheme}」リザルト`
    } else {
      titleElem.textContent = "ガチャリザルト"
    }
    resultElem.appendChild(titleElem)

    if (selectedMode === "lottery") {
      const h1Elem = document.createElement("h1")
      h1Elem.setAttribute("class", "text-6xl my-2")
      h1Elem.textContent = result[0]
      resultElem.appendChild(h1Elem)
    } else if (selectedMode === "sort") {
      const ulElem = document.createElement("ul")
      result.forEach((content) => {
        const liElem = document.createElement("li")
        liElem.setAttribute("class", "text-2xl my-2")
        liElem.textContent = content
        ulElem.appendChild(liElem)
      })
      resultElem.appendChild(ulElem)
    }

    const mainElem = document.querySelector("main")
    mainElem?.appendChild(resultElem)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key=="Enter") {
        gachal()
      }
    } else {
      if (e.key == "Enter") {
        handleAddContent()
      } else if (e.key == "Backspace") {
        const cursolElem = document.activeElement
        if (cursolElem instanceof HTMLInputElement && cursolElem.value === "") {
          const parentElem = cursolElem.parentElement
          if (parentElem && parentElem.id.includes("content") && parentElem.id !== "content1") {
            e.preventDefault()
            const contentId = parentElem.id
            const previousIdNumber = parseInt(contentId.replace("content", "")) - 1
            handleDeleteContent(contentId)

            const previousElem = document.getElementById(`content${previousIdNumber}`)
            const inputElem = previousElem?.querySelector("input")
            inputElem?.focus()
          }
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false)
  }, [])

  return (
    <main className="text-center">
      <div className="w-full flex items-center justify-center my-4">
        <div className="text-left">
          <h1 className="text-2xl mb-2">ガチャ設定</h1>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs mb-2"
            placeholder="〇〇ガチャ"
            required
            onChange={(e) => (setGachaTheme(e.target.value))} />
          
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">抽選</span> 
              <input
                type="radio"
                name="mode"
                value="lottery"
                className="radio checked:bg-red-500"
                checked={selectedMode === "lottery"}
                onChange={handleChangeMode} />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ソート</span> 
              <input
                type="radio"
                name="mode"
                value="sort"
                className="radio checked:bg-blue-500"
                checked={selectedMode === "sort"}
                onChange={handleChangeMode} />
            </label>
          </div>
        </div>
      </div>

      {gachaTheme && <h1 className="text-4xl font-bold my-4">{ gachaTheme }</h1>}
      <form onSubmit={(e) => gachal(e)}>
        <div className="w-full flex justify-center items-center">
          <ul id="form-contents" className="text-left">
            <li id="content1">
              <input
                type="text"
                className="input input-bordered input-primary w-full max-w-xs my-4"
                placeholder="コンテンツ"
                required />
            </li>
          </ul>
        </div>
        <button type="button" className="btn btn-circle btn-outline my-2" onClick={ handleAddContent }>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <line x1="12" x2="12" y2="24" strokeWidth="4"/>
            <line y1="12" x2="24" y2="12" strokeWidth="4"/>
          </svg>
        </button>
        <br />
        <button type="submit" className="btn btn-primary btn-wide my-2">ガチャる</button>
      </form>
    </main>
  )
}

export default Home
