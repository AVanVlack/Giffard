import React from 'react'

function Navbar() {
    return (
        <div className="App">
            <column class="menu">
                <div class="top-bar">
                    <div class="responsive-menu row">
                    <div class="top-bar-left">
                        <ul class="dropdown menu">
                        <li class="menu-text logo">GIFFARD</li>
                        <li><a> <span class="current-location">MAIN</span></a></li>
                        <li><a> <span>CATEGORIES</span></a></li>
                        </ul>
                    </div>
                    <div class="top-bar-right">
                        <ul class="menu">
                        <li id="search-icon"><a><i class="fa fa-search fa-lg"></i></a></li>
                        <li class="user"><a><img src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6?s=80&amp;d=https://codepen.io/assets/avatars/user-avatar-80x80-94696e1c3870f64217a8040eedd4a1ed.png" data-toggle="user-actions"/></a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </column>
            <div class="dropdown-pane float-left" id="user-actions" data-dropdown="data-dropdown" data-position-class="bottom" data-v-offset="4" data-h-offset="4" data-close-on-click="true"> 
                <ul>
                    <li> <a>My Profile</a></li>
                    <li> <a>Add Gif</a></li>
                    <li> <a>Settings</a></li>
                    <li> <a>Sign Out</a></li>
                </ul>
            </div>
            <div class="column search">
                <div class="input-group row">
                    <input class="input-group-field" type="text" placeholder="Search Tags"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar