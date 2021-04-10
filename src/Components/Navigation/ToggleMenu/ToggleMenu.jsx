import React from 'react'
import './ToggleMenu.css'

class ToggleMenu extends React.Component {

    render() {
        const cls = ['toggle-menu', 'fa']

        cls.push(this.props.isOpenMenu ? 'fa-times open' : 'fa-bars')

        return (
            <i
                onClick={this.props.onClick}
                className={cls.join(' ')}
            >

            </i>
        )
    }
}

export default ToggleMenu
