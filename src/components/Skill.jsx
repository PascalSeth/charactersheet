import React from 'react';

const Skill = ({ skill, value, modifier, updateSkill }) => (
  <div className="p-2 border rounded">
    <h4 className="font-bold">{skill.name}</h4>
    <p className="mb-2">Modifier: {modifier}</p>
    <input
      type="number"
      value={value}
      onChange={(e) => updateSkill(Number(e.target.value))}
      className="border px-2 py-1"
    />
  </div>
);

export default Skill;
