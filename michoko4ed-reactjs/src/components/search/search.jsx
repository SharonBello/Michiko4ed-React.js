import React, { useState } from "react";
import { setFilter, loadSets } from '../../store/actions/set.actions.js'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'

export const Search = ({ loc }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { filterBy } = useSelector((storeState) => storeState.setModule)

    const onSearch = (ev) => {
        ev.preventDefault()
        filterBy = { ...filterBy, txt: searchTerm }
        dispatch(setFilter(filterBy))
        navigate('/categories')
        dispatch(loadSets())
    }

    const handleChange = (ev) => {
        setSearchTerm(ev.target.value)
    }

    return (
        <div className="search-container">
            <label>
                <AiOutlineSearch className="search-icon" />
                <input type="search" className="search-input" onChange={handleChange} placeholder="Search..." />
            </label>
            <button className="search-btn" onClick={onSearch}>Search</button>
        </div>
    )

}

