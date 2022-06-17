import React from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

export const QuestionsPreview = ({ question }) => {
    const navigate = useNavigate()
    const { loggedUser } = useSelector((storeState) => storeState.userModule)

    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        navigate(`/categories/${question._id}`)
    }

    return (
        <li className="question-preview">
            <div className="info" onClick={onGoToDetails}>
                <div className="user-info">
                    <img className="sml-round-img" src={`${question.user.imgUrl}`} alt="user" />
                    <div className="question-preview-user-detailed">
                        <p className="user-name">{question.user.fullName}</p>
                    </div>
                </div>

                <div className="question-title">
                    <p >{question.title.substr(0, 70)}...</p>
                </div>
            </div>
            <footer className="card-footer" onClick={onGoToDetails}>
            </ footer>
        </li >
    )
}

