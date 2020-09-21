import React from 'react';

export default class ScoreBoard extends React.Component {


    render() {
        return(
            <div className ="scoreBoard">
                <div className='scoreContent'>
                    <div className='score'>
                        {this.props.score.getScore()}
                    </div >
                    Your score
                <div>
                    Combo: {this.props.score.getCombo()}
                </div>
                </div>
            </div>
        )
    }
}