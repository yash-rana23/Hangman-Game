import React, { Component } from 'react'
import './Hangman.css'
import randomWords from './words.js'
import img0 from './0.jpg'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  }

  constructor(props) {
    super(props)

    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWords(),
      Gameover: 0,
      Gamewon: 0,
      currentstr: '',
    }
    this.handleGuess = this.handleGuess.bind(this)
    this.Restart = this.Restart.bind(this)
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'))
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }))
    if (this.state.nWrong >= 5) {
      this.setState({ Gameover: 1, nWrong: this.state.nWrong + 1 })
    }

    console.log(this.state.Gamewon)
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ))
  }
  Restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: 'apple',
      Gameover: 0,
    })
  }

  /** render: render game */
  render() {
    const butt = { width: '120px', height: '40px' }
    const color = { color: 'red' }

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img
          className={this.state.Gameover || this.state.Gamewon ? 'image' : ''}
          src={this.props.images[this.state.nWrong]}
          alt='The game Image'
        />
        <h1 className={this.state.Gamewon ? 'won' : 'notwon'}>
          Congatulations! You Won the Game
        </h1>
        <div className={this.state.Gameover ? 'restart' : 'notgameover'}>
          <h2 style={color}>
            Game Over! Hargya REEE TUUU
            <br /> The answer is : "{this.state.answer}".
          </h2>
        </div>
        <br></br>
        <button onClick={this.Restart} style={butt} className='restart-btns'>
          ResTart! <i class='fa fa-refresh' aria-hidden='true'></i>
        </button>
        {this.guessedWord().join('') === this.state.answer && (
          <p style={color}>You Win! Tu Toh Bazigaar Nikla Reee!</p>
        )}
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='wrong'>No of Wrong Guesses: {this.state.nWrong}</p>
        <p className={this.state.Gameover ? 'Over' : 'Hangman-btns'}>
          {this.generateButtons()}
        </p>
      </div>
    )
  }
}

export default Hangman
