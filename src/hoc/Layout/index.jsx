import React from 'react'
import './index.css'

class Layout extends React.Component {
    render() {
        return(
            <div className="layout">
                { this.props.children }
            </div>
        )
    }
}

export default Layout