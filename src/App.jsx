import { useState } from 'react'
import { languages } from './data/languages'
import { getFarewellText, randomWord } from './data/util';
import { clsx } from 'clsx';
import Confetti from 'react-confetti'

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => randomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  // Static values
  const alphabets = "abcdefghijklmnopqrstuwxyz"
  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = [...currentWord].every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGussedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessedIncorrect = lastGussedLetter && !currentWord.includes(lastGussedLetter)
    
  
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
    const showLetter = guessedLetters.includes(letter) || isGameLost
    const className = clsx(isGameLost && !guessedLetters.includes(letter) && "missed-letter")
    return <span className={className} key={index}>{showLetter ? letter.toUpperCase() : ""}</span>
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
      disabled={isGameOver}
      className={className}
      onClick={() => addGuessedLetter(letter)}
    >
      {letter.toUpperCase()}
    </button>
  })

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessedIncorrect
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessedIncorrect) {
      return <p className="farewell-message">{getFarewellText(languages[wrongGuessCount-1].name)}</p>
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
      </>
      )
    }
  }

  function resetGame() {
    setCurrentWord(randomWord)
    setGuessedLetters([])
  }

  return (
    <main>
       {
          isGameWon && 
            <Confetti
              recycle={false}
              numberOfPieces={1000}
            />
        }
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
        {renderGameStatus()}
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
      {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
    </main>
  )
}

export default App
