import React, { useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './utils/constants';
import Character from './components/Character';
import PartySkillCheck from './components/PartySkillCheck';

const App = () => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = () => {
    const newCharacter = {
      id: Date.now(),
      name: `Character ${characters.length + 1}`,
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => ({ ...acc, [attr]: 10 }), {}),
      skills: SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {}),
    };

    setCharacters([...characters, newCharacter]);
  };

  const updateCharacter = (updatedCharacter) => {
    setCharacters(characters.map(character =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Character Sheet App</h1>
      <button onClick={addCharacter} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Character</button>
      <div className="space-y-6">
        {characters.map(character => (
          <Character key={character.id} character={character} updateCharacter={updateCharacter} />
        ))}
      </div>
      <PartySkillCheck characters={characters} />
    </div>
  );
};

export default App;
