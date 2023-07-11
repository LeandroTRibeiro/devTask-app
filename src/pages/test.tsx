import React, { useState } from 'react';

const InputList = () => {
  const [inputs, setInputs] = useState(['']);

  const handleChange = (index: number, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const removeInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  return (
    <div className='mt-10 bg-stone-500'>
      {inputs.map((value, index) => (
        <div key={index}>
          <input
            type="date"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button onClick={() => removeInput(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addInput}>Add Input</button>
    </div>
  );
};

export default InputList;
