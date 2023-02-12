import { useState } from 'react';

export default function InputChild({
  className,
  text,
  type,
  handleBlur,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const inputHandleBlur = () => {
    setIsEditing(false);
    handleBlur(inputText);
  };

  const beginEdit = (e) => {
    setIsEditing(true);
    e.target.focus();
  };
  return (
    <div className={className}>
      {isEditing ? (
        <div className='edit-animation-container'>
          <div className="edit-container">
            <span className="expander">{inputText || text}</span>
            {type === 'textarea' ? (
              <textarea
                autoFocus
                onFocus={handleFocus}
                onBlur={inputHandleBlur}
                value={inputText}
                onChange={handleChange}
              />
            ) : (
              <input
                autoFocus
                onFocus={handleFocus}
                type={type}
                onBlur={inputHandleBlur}
                value={inputText}
                onChange={handleChange}
              />
            )}
          </div>
          <span className="focus-indicator" />
        </div>
      ) : (
        <span className="true-text" onClick={beginEdit}>
          {text}
        </span>
      )}
    </div>
  );
}
