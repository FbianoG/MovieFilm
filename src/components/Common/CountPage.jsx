import { useRef, useState, useEffect } from 'react'
import './CountPage.css'

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CountPage(props) {
    const urlQuery = new URLSearchParams(window.location.search).get("list")
    const urlQuery2 = new URLSearchParams(window.location.search).get("category")
    const conteinerCountPage = useRef()
    const [muda, setmuda] = useState(false)
    const [page, setPage] = useState(props.page.page);


    function fixedPagination() {
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

    function handleChange(e, value) {
        setPage(value);
        setmuda(true)
    }

    window.addEventListener('scroll', fixedPagination)

    useEffect(() => {
        if (muda) {
            window.scrollTo({ top: 0 })
            if (urlQuery) location.href = `/movies?list=${urlQuery}&page=${page}`
            else location.href = `/movies?category=${urlQuery2}&page=${page}`
            setmuda(false)
        }
    }, [muda])

    return (
        <div className="Container__count" ref={conteinerCountPage}>

            <Stack spacing={2}>
                <Pagination count={500} size='large' page={page} onChange={handleChange} />
            </Stack>
        </div>


    )
}