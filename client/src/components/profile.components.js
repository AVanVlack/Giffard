import React from 'react'

function Profile() {
    return (
        <div className="App">
            <div class="row profile-intro">
                <div class="column medium-4 photo"><img src="http://gravatar.com/avatar/9e6cb7c90ee951ac7f6280cbad6876a6?s=400"/></div>
                <div class="column medium-8 stats">
                    <h2>Andrew VanVlack</h2><a href="http://andrewvanvlack.com/">http://andrewvanvlack.com</a>
                    <ul>
                    <li><i class="fa fa-arrow-up"> 5</i></li>
                    <li><i class="fa fa-star"> 32</i></li>
                    </ul>
                </div>
                </div>
                <div class="row loading-tabs">
                <ul>
                    <li active="true">UPLOADS</li>
                    <li >STARED</li>
                </ul>
                </div>
                <div class="row small-up-2 medium-up-3 large-up-4 gallary tabify">
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/fVfnOJ0oLb87m/giphy.gif"/>
                    <p>#mad #not cool</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/CBl5I5d0YFUsw/giphy.gif"/>
                    <p>#magic school bus</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/l41lXwNetL7oWLrd6/giphy.gif"/>
                    <p>#csi #glove</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/13S2y4dF6TPxHW/giphy.gif"/>
                    <p>#cool bro</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/YgmczzYWY4DTO/giphy.gif"/>
                    <p>#david bowie</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/xT1XGS8p8GZ0RqN7J6/giphy.gif"/>
                    <p>#brb #germs</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/iW8tsoJWcfPc4/giphy.gif"/>
                    <p>#blaaa #seinfeld</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/w0CJXS2M44xfW/giphy.gif"/>
                    <p>#pizza #cat</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/oje6kPRIef6Gk/giphy.gif"/>
                    <p>#coal #spirited away</p>
                    </div>
                </div>
                <div class="column">
                    <div class="giffard"><img src="https://media.giphy.com/media/3o85xxC61hRrRivlss/giphy.gif"/>
                    <p>#dog human #bro</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
