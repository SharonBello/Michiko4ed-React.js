import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'
import { AppFooter } from './components/app-footer.jsx'
import { AppHeader } from './components/app-header.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <section className="app-container">
                <div className="app-header-container">
                    <h1>Hi</h1>
                    <AppHeader />
                </div>
                <main className="routes-container">
                    <Routes>
                        {routes.map(route =>
                            <Route key={route.path}
                                exact={true}
                                element={route.component}
                                path={route.path} />)}
                    </Routes>
                    <div className="footer-container container">
                        <AppFooter />
                    </div>
                </main>
            </section>
        )
    }
}


