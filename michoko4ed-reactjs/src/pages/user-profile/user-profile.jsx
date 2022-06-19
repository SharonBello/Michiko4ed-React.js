import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { loadGames } from '../../store/actions/game.actions.js';
import { userService } from '../../services/user.service.js';
import { utilService } from '../../services/util.service.js';
import { Loader } from '../../components/loader/loader.jsx';

export const UserProfile = () => {
    const [loggedUser, setLoggedUser] = useState(userService.getLoggedUser())
    const user = useSelector((storeState) => storeState.userModule.loggedUser)
    let { games } = useSelector((storeState) => storeState.gameModule)
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()
    const RED = '#F74040'
    const GRAY = '#62646A'
    const GREEN = '#1DBF73'
    const BLACK = '#404145'

    useEffect(() => {
        dispatch(loadGames(loggedUser, 'getGames'))
        setTimeout(() => {
            setLoader(false)
        }, 3000)

        games = games.filter(game => game.user !== loggedUser.userName)
    }, [])

    return (
        <section className='user-profile-layout container'>
            {loader && <Loader />}
            <section className='user-profile flex'>

                <div className='profile-right-container'>
                    {(games.length) ?
                        <div className='user-profile-card'>
                            {games.map(game => <div className='game-card' key={game._id}><h4 className='game-desc-profile'>{game.question.description}</h4>
                                <img className='question-img-profile' alt="" src={game.question.imgUrl} />
                                <div className='card-profile-info'>
                                    <h5>Seller: {game.user.fullName}</h5>
                                    <h5>Status: <span style={{ color: `${game.status === 'inactive' ? RED : game.status === 'active' ? GREEN : game.status === 'onHold' ? BLACK : GRAY}` }}>{game.status}</span></h5>
                                    <h5>Created Date: {utilService.setDateTime(game.createdAt)}</h5>
                                </div>
                            </div>)}
                        </div> :
                        (<h1>You don't have Games yet!</h1>)}
                </div>

            </section>
        </section>
    )
}