import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const MultiProgressBar: React.FC = () => {
  const [inputs, setInputs] = useState<number[]>([50, 30, 75]);

  const handleInputChange = (index: number, value: string) => {
    let numValue = parseInt(value) || 0;
    // Clamp value between 0 and 100
    numValue = Math.max(0, Math.min(100, numValue));
    
    const newInputs = [...inputs];
    newInputs[index] = numValue;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 10) {
      setInputs([...inputs, 50]);
    }
  };

  const removeInput = (index: number) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  const averageValue = inputs.length > 0 
    ? Math.round(inputs.reduce((sum, val) => sum + val, 0) / inputs.length)
    : 0;

  const getProgressClass = (value: number): string => {
    if (value < 40) return 'progress-low';
    if (value < 70) return 'progress-medium';
    return 'progress-high';
  };

  return (
    <div className="task-card">
      <h2 className="section-title">📊 Multi-Input Progress Bar</h2>

      {/* Main Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Average Progress</span>
          <span className="text-lg font-bold text-foreground">{averageValue}%</span>
        </div>
        <div className="progress-bar-container h-6">
          <div
            className={`progress-bar-fill ${getProgressClass(averageValue)}`}
            style={{ width: `${averageValue}%` }}
          />
        </div>
      </div>

      {/* Individual Inputs and Sub-bars */}
      <div className="space-y-4">
        {inputs.map((value, index) => (
          <div key={index} className="animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <label className="text-sm font-medium text-muted-foreground w-20">
                Input {index + 1}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                min={0}
                max={100}
                className="input-base w-24 text-center"
              />
              <span className="text-sm text-muted-foreground">%</span>
              {inputs.length > 1 && (
                <button
                  onClick={() => removeInput(index)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
            <div className="progress-bar-container">
              <div
                className={`progress-bar-fill ${getProgressClass(value)}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Input Button */}
      <button
        onClick={addInput}
        disabled={inputs.length >= 10}
        className="btn-secondary mt-6 flex items-center gap-2 mx-auto"
      >
        <Plus size={18} />
        Add Input
      </button>

      {/* Legend */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded progress-low" />
          <span className="text-muted-foreground">&lt; 40%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded progress-medium" />
          <span className="text-muted-foreground">40-70%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded progress-high" />
          <span className="text-muted-foreground">&gt; 70%</span>
        </div>
      </div>
    </div>
  );
};

export default MultiProgressBar;
