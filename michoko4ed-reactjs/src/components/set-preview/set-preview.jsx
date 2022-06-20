import React from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

export const SetPreview = ({ set, user }) => {
    const navigate = useNavigate()
    const { loggedUser } = useSelector((storeState) => storeState.userModule)

    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        navigate(`/set/${set._id}`)
    }

    return (
        <li className="set-preview">
            <div className="info" onClick={onGoToDetails}>
                <div className="user-info">
                    <img className="sml-round-img" src={`${user.user.imgUrl}`} alt="user" />
                    <div className="set-preview-user-detailed">
                        <p className="user-name">{user.user.fullName}</p>
                    </div>
                </div>

                <div className="set-title">
                    <p >{set.title.substr(0, 70)}...</p>
                </div>
            </div>
            <footer className="card-footer" onClick={onGoToDetails}>
            </ footer>
        </li >
    )
}

