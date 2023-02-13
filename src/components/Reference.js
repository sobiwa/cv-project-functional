import { useRef, useEffect } from 'react';
import InputChild from './InputChild';
import { handleBlur, updateComponentHeight } from './shared/helpers';

export default function Reference({
  phoneDisplay,
  id,
  height,
  set,
  contact,
  email,
  phone,
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
        {phoneDisplay ? '|' : ''}
        {phoneDisplay &&
        <InputChild
          className={'reference--phone'}
          text={phone}
          type="tel"
          handleBlur={handleBlur(set, 'phone', [id])}
        />}
      </div>
    </div>
  );
}
