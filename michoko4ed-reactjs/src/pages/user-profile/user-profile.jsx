import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { loadSets } from '../../store/actions/set.actions.js'
import { userService } from '../../services/user.service.js'
import { utilService } from '../../services/util.service.js'
import { Loader } from '../../components/loader/loader.jsx'

export const UserProfile = () => {
    const [loggedUser, setLoggedUser] = useState(userService.getLoggedUser())
    const user = useSelector((storeState) => storeState.userModule.loggedUser)
    let { sets } = useSelector((storeState) => storeState.setModule)
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()
    const RED = '#F74040'
    const GRAY = '#62646A'
    const GREEN = '#1DBF73'
    const BLACK = '#404145'

    useEffect(() => {
        dispatch(loadSets(loggedUser, 'getSets'))
        setTimeout(() => {
            setLoader(false)
        }, 3000)

        sets = sets.filter(set => set.user_id !== loggedUser._id)
    }, [])

    return (
        <section className='user-profile-layout container'>
            {loader && <Loader />}
            <section className='user-profile flex'>

                <div className='profile-right-container'>
                    {(sets.length) ?
                        <div className='user-profile-card'>
                            {sets.map(set => <div className='set-card' key={set._id}><h4 className='set-desc-profile'>{set.description}</h4>
                                <img className='set-img-profile' alt="" src={set.imgUrl} />
                                <div className='card-profile-info'>
                                    <h5>Status: <span style={{ color: `${set.status === 'inActive' ? RED : set.status === 'active' ? GREEN : set.status === 'pending' ? BLACK : GRAY}` }}>{set.status}</span></h5>
                                    <h5>Created Date: {utilService.setDateTime(set.createdAt)}</h5>
                                </div>
                            </div>)}
                        </div> :
                        (<h1>You haven't created games yet!</h1>)}
                </div>
            </section>
        </section>
    )
}