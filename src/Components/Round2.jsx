import React, { Component, Fragment } from 'react';
import shuffle from 'shuffle-array';
import Winner from './Winner';

class RoundTwo extends Component {

  constructor(props) {
    super(props);

    this.state = this.init(this.props.winners, this.props.roundNumber, this.props.finalRound);
  }
  /** to determine state, passing in players prop and round number prop */
  init(winners, roundNumber, finalRound) {
    console.log(this.state)
    const matches = [];
    shuffle(winners);
    while (winners.length >= 2) {
      const match = [winners.pop(), winners.pop()];
      match[0].win = false;
      match[1].win = false;
      match[0].style = buttonNeutralStyle;
      match[1].style = buttonNeutralStyle;
      match[0].resultTxt = '';
      match[1].resultTxt = '';
      matches.push(match);
    }
    return {
      players: winners,
      matches: matches,
      winners: [],
      roundOver: false,
      roundNumber: roundNumber, 
      finalRound: finalRound
    };
    console.log(this.state)
  }

  /** matchWinner needs to be array index of 0 or 1 (for left or right player). */
  setResult(matchIdx, matchWinner) {
    const matches = this.state.matches;
    const match = matches[matchIdx];
    const winners = [];
    match[0].win = (matchWinner === 0);
    match[1].win = (matchWinner === 1);
    match[0].style = this.computeButtonStyle(matchIdx, 0)
    match[1].style = this.computeButtonStyle(matchIdx, 1)
    match[0].resultTxt = (matchWinner === 0) ? ' wins' : ' loses'
    match[1].resultTxt = (matchWinner === 1) ? ' wins' : ' loses'
    matches[matchIdx] = match;
    this.setState({ matches: matches });
    try {
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][0].win) {
          winners.push(matches[i][0]);
        } else if (matches[i][1].win) {
          winners.push(matches[i][1]);
        }
      }
      this.setState({ winners: winners });
    } catch (e) {
    }

    if (winners.length >= this.state.matches.length) {

      /** TODO - Continue here... */
      this.setState({ roundOver: true });
      console.warn('Winners Array is complete!', winners);
      console.log(this.state);

    } 

    if (matches.length === 1) {
      this.setState({ finalRound: true });
    }
  }

  computeButtonStyle(matchIdx, playerIdx) {
    const match = this.state.matches[matchIdx];
    if(!match[0].win && !match[1].win) {
      return buttonNeutralStyle;          // If no winners..
    } else if(match[playerIdx].win) {
      return buttonWinStyle;              // If this player is won...
    } else {
      return buttonLoseStyle;             // If this player shit-bagged it...
    }
  }

  render() {
    const roundOver = this.state.roundOver;
    const roundNumber = this.state.roundNumber;
    const winners = this.state.winners;
    const finalRound = this.state.finalRound;
    const matches = this.state.matches;
    return (
      <Fragment>
        <h2>Round { this.state.roundNumber }... Fight!</h2>
        {this.state.matches.map((match, i) => (
        <div key={i} style={ divStyle }>
          <p style={matchesBox}>{ match[0].value }&nbsp;<span style={ spanStyle }>VS</span>&nbsp;{ match[1].value }</p>
          <button onClick={e => this.setResult(i, 0)} style={ match[0].style }>{match[0].value + match[0].resultTxt }</button>
          <button onClick={e => this.setResult(i, 1)} style={ match[1].style }>{match[1].value + match[1].resultTxt }</button>
          <hr />
        </div>
        ))}
        <button style={ roundOver ? nextRound : finishThem }>Proceed to round {roundNumber+1}... if you dare</button> 
        {roundOver && matches.length > 1 ? <RoundTwo winners={this.state.winners} roundNumber={this.state.roundNumber+1}/> : null}
      </Fragment>
    );
  }
}

const spanStyle = {
  color: 'red',
  fontWeight: 'bold'
};

const divStyle = {
  width: 280,
  textAlign: 'center',
  marginTop: 10
};

const matchesBox = {
  border: 'black 1 solid',
  boxShadow: "0 0 8px 1px black",
  margin: 10,
};

const finishThem = {
  backgroundColor: 'grey',
};

const nextRound = {
  backgroundColor: 'green',
};

const buttonNeutralStyle = {
  border: 'black 1 solid',
  color: 'white',
  width: 125,
  margin: 5,
  backgroundColor: 'grey',
};

const buttonWinStyle = {
  border: 'black 1 solid',
  color: 'white',
  width: 125,
  margin: 5,
  backgroundColor: 'green',
  boxShadow: "0 0 8px 1px black",
};

const buttonLoseStyle = {
  border: 'black 1 solid',
  color: 'white',
  width: 125,
  margin: 5,
  backgroundColor: 'red',
};

export default RoundTwo;