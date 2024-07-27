import React, { useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../utils/constants';
import Attribute from './Attribute';
import Skill from './Skill';
import SkillCheck from './Skillcheck';

const calculateModifier = (value) => Math.floor((value - 10) / 2);

const Character = ({ character, updateCharacter }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [skillPoints, setSkillPoints] = useState(10 + 4 * calculateModifier(character.attributes.Intelligence));

  const updateAttribute = (attribute, value) => {
    const newAttributes = { ...character.attributes, [attribute]: value };
    const newSkillPoints = 10 + 4 * calculateModifier(newAttributes.Intelligence);
    updateCharacter({ ...character, attributes: newAttributes });
    setSkillPoints(newSkillPoints);
  };

  const updateSkill = (skill, value) => {
    const newSkills = { ...character.skills, [skill]: value };
    updateCharacter({ ...character, skills: newSkills });
  };

  const selectClass = (className) => setSelectedClass(className);

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {ATTRIBUTE_LIST.map(attr => (
          <Attribute
            key={attr}
            name={attr}
            value={character.attributes[attr]}
            modifier={calculateModifier(character.attributes[attr])}
            updateAttribute={updateAttribute}
          />
        ))}
      </div>
      <h3 className="text-lg font-bold mt-4">Classes</h3>
      <div className="flex flex-wrap space-x-2 mb-4">
        {Object.keys(CLASS_LIST).map(className => (
          <button
            key={className}
            onClick={() => selectClass(className)}
            className={`px-4 py-2 rounded ${Object.entries(CLASS_LIST[className]).every(([attr, min]) => character.attributes[attr] >= min) ? 'bg-green-500 text-white' : 'bg-gray-500 text-black'}`}
          >
            {className}
          </button>
        ))}
      </div>
      {selectedClass && (
        <div className="mb-4">
          <h4 className="font-bold">Minimum Requirements for {selectedClass}</h4>
          <ul>
            {Object.entries(CLASS_LIST[selectedClass]).map(([attr, min]) => (
              <li key={attr}>{attr}: {min}</li>
            ))}
          </ul>
        </div>
      )}
      <h3 className="text-lg font-bold">Skills (Points Available: {skillPoints})</h3>
      <div className="grid grid-cols-2 gap-4">
        {SKILL_LIST.map(skill => (
          <Skill
            key={skill.name}
            skill={skill}
            value={character.skills[skill.name]}
            modifier={calculateModifier(character.attributes[skill.attributeModifier])}
            updateSkill={(value) => updateSkill(skill.name, value)}
          />
        ))}
      </div>
      <SkillCheck character={character} />
    </div>
  );
};

export default Character;
