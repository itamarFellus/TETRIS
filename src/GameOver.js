import React from 'react';

export default class GameOver extends React.Component {

    render() {
        return(
            <div className="gameOver">
                <div className='gameOverText'>
                    Game Over
                </div>
                <div className='gameOverScore'>
                    Your Score:
                </div>
                <div className='scoreText'>
                    {this.props.score.getScore()}
                </div>
            </div>
        )
    }
}