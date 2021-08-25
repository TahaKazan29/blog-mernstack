import './header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img className="headerImg" src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
        </div>
    )
}
