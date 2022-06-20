import { LogoFull, Copyright, LinkedIn } from '../../services/svg.service.js'

export const AppFooter = (props) => {

    return (
        <footer className="footer-bottom">
            <div className="footer-left flex">
                <div className="footer-logo">
                    <LogoFull />
                </div>
                <p className="legal-text flex">
                    <span className="copyright-icon">
                        <Copyright />
                    </span>
                    All rights reserved to Michiko4Ed
                </p>

            </div>
            <ul className="social-container flex clean-list">
                <li><LinkedIn /></li>
            </ul>
        </footer>
    )
}

