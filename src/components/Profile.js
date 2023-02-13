import { useRef, useEffect } from 'react';
import InputChild from './InputChild';
import profileIcon from '../assets/profileIcon.svg';

export default function Profile({
  handleBlur,
  height,
  updateHeight,
  pageHeight,
  text,
}) {
  const domElement = useRef(0);

  useEffect(() => {
    console.log('update profile');
    const currHeight = domElement.current.scrollHeight;
    if (currHeight !== height) {
      updateHeight(currHeight);
    }
  }, [text, pageHeight]);

  return (
    <section className="profile" ref={domElement}>
      <div className="section-icon">
        <img src={profileIcon} alt="profile icon" />
      </div>
      <div className="section-content">
        <h2 className="main--title">Profile</h2>
        <InputChild type="textarea" text={text} handleBlur={handleBlur} />
      </div>
    </section>
  );
}
