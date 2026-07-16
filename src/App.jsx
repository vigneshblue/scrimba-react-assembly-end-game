import { useState } from 'react'
import { languages } from './data/languages'

function App() {
  const [currentWord, setCurrentWord] = useState('react')
  const languageElements = languages.map(language => {
    const styles = {backgroundColor:language.backgroundColor, color:language.color}
    return (
      <span 
        key={language.name}
        style={styles}
      >
        {language.name}
      </span>
    )
  })
  const currentWordElements = [...currentWord].map((char, index) => (
    <span key={index}>{char.toUpperCase()}</span>
  ))
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
    </main>
  )
}

export default App
