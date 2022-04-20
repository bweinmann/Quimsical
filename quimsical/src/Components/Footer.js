import { AiFillGithub } from "react-icons/ai"
import { AiFillLinkedin } from "react-icons/ai"

const Footer = () => {

    return (  
        <div className="main-footer">
            <ul className="list-unstyled">
                <a className="social-link" href="www.linkedin.com/in/blake-weinmann"><AiFillLinkedin /></a>
            </ul>
            <ul className="list-unstyled">
               <a className="social-link" href="https://github.com/bweinmann"><AiFillGithub /></a>
            </ul>
        </div>
    )
}

export default Footer;
