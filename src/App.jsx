import { useState } from 'react'
import { languages } from './data/languages'
import { clsx } from 'clsx';

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState('react')
  const [guessedLetters, setGuessedLetters] = useState([])
  // Static values
  const alphabets = "abcdefghijklmnopqrstuwxyz"
  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = [...currentWord].every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
    
  
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => {
      if (prevLetters.includes(letter)) {
        return prevLetters
      } else {
        return [...prevLetters, letter]
      }
    })
  }

  const languageElements = languages.map((language, index) => {
    const styles = {backgroundColor:language.backgroundColor, color:language.color}
    const className = index < wrongGuessCount ? "lost" : ""
    return (
      <span 
        className={className}
        key={language.name}
        style={styles}
      >
        {language.name}
      </span>
    )
  })

  const currentWordElements = [...currentWord].map((letter, index) => {
    return <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
})

  const keyboardElements = [...alphabets].map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })
    return <button 
      key={letter}
      className={className}
      onClick={() => addGuessedLetter(letter)}
    >
      {letter.toUpperCase()}
    </button>
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className="current-word">
        {currentWordElements}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
