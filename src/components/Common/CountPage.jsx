import { useRef } from 'react'
import './CountPage.css'

export default function CountPage(props) {

    const showPage = useRef()
    const countPage = useRef()
    const conteinerCountPage = useRef()

    function returnPage() {
        if (props.page.page - 1 === 0) {
            return
        }
        props.page.setPage(props.page.page -= 1)
        window.scrollTo({ top: 0 })
        location.href = `/movies?category=popular&page=${props.page.page}`
    }

    function nextPage() {
        props.page.setPage(props.page.page += 1)
        window.scrollTo({ top: 0 })
        location.href = `/movies?category=popular&page=${props.page.page}`
    }

    function name() {
        if (window.scrollY > 70) {
            conteinerCountPage.current.style.width = "100%"
            conteinerCountPage.current.style.padding = "20px 0 "
            conteinerCountPage.current.style.position = "fixed"
            conteinerCountPage.current.style.top = "70px"
            conteinerCountPage.current.style.left = "50%"
            conteinerCountPage.current.style.transform = "translateX(-50%)"
            conteinerCountPage.current.style.background = "linear-gradient(to bottom, #222, 80%, transparent)"
            conteinerCountPage.current.style.zIndex = "5"
        } else {
            conteinerCountPage.current.style.width = ""
            conteinerCountPage.current.style.padding = ""
            conteinerCountPage.current.style.position = ""
            conteinerCountPage.current.style.top = ""
            conteinerCountPage.current.style.left = ""
            conteinerCountPage.current.style.transform = ""
            conteinerCountPage.current.style.background = ""
            conteinerCountPage.current.style.zIndex = ""
        }
    }

    window.addEventListener('scroll', name)

    return (
        <div className="contentCount">


            <div className="containerCountPage" ref={conteinerCountPage}>
                <div className="countPage" ref={countPage}>
                    <button onClick={returnPage}>Return</button>
                    <span>{props.page.page}</span>
                    <button onClick={nextPage}>Next</button>
                </div>
            </div>
        </div>
    )
}