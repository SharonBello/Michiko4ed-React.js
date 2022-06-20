import React, { useEffect, useState } from 'react';
import { loadSets } from '../../store/actions/set.actions.js'
import { SetList } from '../../components/set-list/set-list.jsx'
import { useSelector, useDispatch } from 'react-redux'
// import { FilterBreadCrumbs } from '../cmps/filters/filter-breadcrumbs.jsx'
import { Loader } from '../../components/loader/loader.jsx';

export const AppPage = () => {
    let { filterBy } = useSelector((storeState) => storeState.setModule)
    const { sets } = useSelector((storeState) => storeState.setModule)
    const { user } = useSelector((storeState) => storeState.userModule)
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000)
        dispatch(loadSets(filterBy))
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className="sets-app-container">
        <div>
            <div className="sets-preview-main-wrapper container">
                <div className="sets-list-container flex flex-column">
                    {loader && <Loader />}
                    <SetList sets={sets} user={user} />
                </div>
            </div>
        </div>
    </section>
    )
}