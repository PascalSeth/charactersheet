import React, { useState } from 'react';
import { SKILL_LIST } from '../utils/constants';

const PartySkillCheck = ({ characters }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(10);
  const [result, setResult] = useState(null);

  const performPartySkillCheck = () => {
    let bestCharacter = null;
    let bestTotal = -Infinity;

    characters.forEach(character => {
      const skill = SKILL_LIST.find(skill => skill.name === selectedSkill);
      const skillModifier = character.skills[selectedSkill] + Math.floor((character.attributes[skill.attributeModifier] - 10) / 2);
      const roll = Math.floor(Math.random() * 20) + 1;
      const total = roll + skillModifier;

      if (total > bestTotal) {
        bestTotal = total;
        bestCharacter = { character, roll, total, success: total >= dc };
      }
    });

    setResult(bestCharacter);
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h4 className="font-bold mb-2">Party Skill Check</h4>
      <div className="mb-2">
        <label className="mr-2">Skill:</label>
        <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="border px-2 py-1">
          {SKILL_LIST.map(skill => (
            <option key={skill.name} value={skill.name}>{skill.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">DC:</label>
        <input
          type="number"
          value={dc}
          onChange={(e) => setDc(Number(e.target.value))}
          className="border px-2 py-1"
        />
      </div>
      <button onClick={performPartySkillCheck} className="bg-blue-500 text-white px-4 py-2 rounded">Roll</button>
      {result && (
        <div className="mt-2">
          <h5 className="font-bold">Best Result:</h5>
          <p>Character: {result.character.name}</p>
          <p>Roll: {result.roll}</p>
          <p>Total: {result.total}</p>
          <p>{result.success ? 'Success!' : 'Failure'}</p>
        </div>
      )}
    </div>
  );
};

export default PartySkillCheck;
