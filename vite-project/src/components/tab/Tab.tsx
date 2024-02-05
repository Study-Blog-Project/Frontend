import {useEffect, useState} from 'react';

interface TabProps {
  content: string[];
  className?: string;
  defaultSelected?: string;
  onTabSelect: (selectedContent: string) => void;
}

function Tab({ content = [], className = '', onTabSelect, defaultSelected }: TabProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleDivClick = (index: number) => {
    setSelectedIdx(index);
    onTabSelect(content[index])
  };

  useEffect(() => {
    console.log(defaultSelected, 'defaultSelected');
    if(!defaultSelected) return;
    if(!content.includes(defaultSelected)) return;
    setSelectedIdx(content.indexOf(defaultSelected));
  }, [defaultSelected]);

  return (
    <div className={`flex ${className}`}>
      {content.map((word, index) => (
        <div className="mr-10 cursor-pointer "
          key={index}
          onClick={() => handleDivClick(index)}
          style={{
            borderBottom: selectedIdx === index ? '2px solid black' : 'none',
          }}
        >
          <span className="text-2xl" style={{
            fontWeight: selectedIdx === index ? 'bold' : 'normal',
          }} >{word}</span>
          
        </div>
      ))}
    </div>
  );
}

export default Tab;
