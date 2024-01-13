import { useEffect, useState } from 'react';

interface TabProps {
  content?: string[];
  className?: string;
}

function Tab({ content = [], className = '' }: TabProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (content && content.length > 0) {
      const joinedContent = content.join(', ');
      console.log(joinedContent);
    }
  }, [content]);

  const handleDivClick = (index: number) => {
    setSelectedIdx(index);
  };

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
