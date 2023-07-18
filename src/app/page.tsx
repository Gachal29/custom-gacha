"use client"
import { NextPage } from "next"
import { title } from "process"
import React, { FormEvent, useEffect, useState } from "react"


const Home: NextPage = () => {
  const [gachaTheme, setGachaTheme] = useState("")
  const [themeDecided, setThemeDecided] = useState(false)
  // const [gachaled, setGachaled] = useState(false)

  const handleThemeDecide = (evnet: FormEvent) => {
    evnet.preventDefault()
    setThemeDecided(true)
    return false
  }

  const handleDeleteContent = (contentId: number) => {
    const content = document.getElementById(`content${contentId}`)
    content?.remove()
  }

  const handleAddContent = () => {
    const formContents = document.getElementById("form-contents")
    if (formContents) {
      const contentId = document.querySelectorAll("#form-contents li").length + 1
      const newContent = document.createElement("li")
      newContent.setAttribute("id", `content${contentId}`)
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
      btnElem.addEventListener("click", () => handleDeleteContent(contentId))
      
      const deleteImgElem = document.createElement("img")
      deleteImgElem.setAttribute("src", "/delete-icon.svg")
      btnElem.appendChild(deleteImgElem)

      newContent.appendChild(btnElem)
      formContents.appendChild(newContent)
    }
  }

  const contentsShuffle = (contents: Array<string>): Array<string> => {
    for (let i = (contents.length - 1); 0 < i; i--) {
      let r = Math.floor(Math.random() * (i + 1))

      let tmp = contents[i]
      contents[i] = contents[r]
      contents[r] = tmp
    }

    return contents
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
    // setGachaled(true)

    const oldResultElem = document.getElementById("result")
    if (oldResultElem) {
      oldResultElem.remove()
    }

    const ulElem = document.createElement("ul")
    result.forEach((content) => {
      const liElem = document.createElement("li")
      liElem.setAttribute("class", "text-2xl my-2")
      liElem.textContent = content
      ulElem.appendChild(liElem)
    })

    const resultElem = document.createElement("div")
    resultElem.setAttribute("id", "result")
    
    const titleElem = document.createElement("h1")
    titleElem.setAttribute("class", "text-4xl font-bold my-4")
    titleElem.textContent = `「${gachaTheme}」リザルト`
    resultElem.appendChild(titleElem)
    resultElem.appendChild(ulElem)

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
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false)
  }, [])

  return (
    <main className="text-center">
      <form onSubmit={(e) => handleThemeDecide(e)} className="mb-8">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs md:mr-4"
          placeholder="〇〇ガチャ"
          required
          onChange={(e) => {setGachaTheme(e.target.value)} } />

        <button type="submit" className="btn btn-neutral my-2">テーマを決定する</button>
      </form>

      {themeDecided && <h1 className="text-4xl font-bold my-4">{ gachaTheme }</h1>}
      <form onSubmit={(e) => gachal(e) }>
        <ul id="form-contents">
          <li id="content1">
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-xs my-2"
              placeholder="コンテンツ"
              required />
          </li>
        </ul>
        <button type="button" className="btn btn-circle btn-outline my-2" onClick={ handleAddContent }>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <line x1="12" x2="12" y2="24" stroke-width="4"/>
            <line y1="12" x2="24" y2="12" stroke-width="4"/>
          </svg>
        </button>
        <br />
        <button type="submit" className="btn btn-primary btn-wide my-2">ガチャる</button>
      </form>

      {/* {gachaled && gachaTheme && <h1 className="text-4xl font-bold my-4">「{ gachaTheme }」リザルト</h1>} */}
    </main>
  )
}

export default Home
