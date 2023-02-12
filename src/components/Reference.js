import { useRef, useEffect } from 'react';
import InputChild from './InputChild';

export default function Reference({
  id,
  height,
  updateComponentHeight,
  set,
  contact,
  email,
  phone,
  handleBlur,
}) {
  const divElement = useRef(0);

  useEffect(() => {
    if (height !== divElement.current.scrollHeight) {
      updateComponentHeight(id, divElement.current.scrollHeight, set);
    }
  });

  return (
    <div ref={divElement}>
      <InputChild
        className="reference--contact"
        text={contact}
        type="text"
        handleBlur={handleBlur(set, 'contact', [id])}
      />
      <div className="ref--contact-info">
        <InputChild
          className={'reference--email'}
          text={email}
          type="email"
          handleBlur={handleBlur(set, 'email', [id])}
        />
        |
        <InputChild
          className={'reference--phone'}
          text={phone}
          type="tel"
          handleBlur={handleBlur(set, 'phone', [id])}
        />
      </div>
    </div>
  );
}
