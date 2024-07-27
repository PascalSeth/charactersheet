import React from 'react';

const Attribute = ({ name, value, modifier, updateAttribute }) => (
  <div className="p-2 border rounded">
    <h4 className="font-bold">{name}</h4>
    <p className="mb-2">Modifier: {modifier}</p>
    <input
      type="number"
      value={value}
      onChange={(e) => updateAttribute(name, Number(e.target.value))}
      className="border px-2 py-1"
    />
  </div>
);

export default Attribute;
