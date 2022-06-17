import { LogoFullFooter, Copyright, LinkedIn, Github } from '../services/svg.service.js'

export const AppFooter = (props) => {

    return (
        <footer className="footer-bottom">
            <div className="footer-left flex">
                <div className="footer-logo">
                    <LogoFullFooter />
                </div>
                <p className="legal-text flex">
                    <span className="copyright-icon">
                        <Copyright />
                    </span>
                    All rights reserved to Michiko4Ed
                </p>

            </div>
            <ul className="social-container flex">
                <li><LinkedIn /></li>
                <li><Github /></li>
            </ul>
        </footer>
    )
}

