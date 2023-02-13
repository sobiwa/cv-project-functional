export default function SkillVisual({ handleClick, num }) {
  const styler = (rate) =>
    rate <= num ? { opacity: '1' } : { opacity: '0' };
  return (
    <div className="skill--visual">
      <div className='skill--notch' style={styler(1)} onClick={() => handleClick(1)}></div>
      <div className='skill--notch' style={styler(2)} onClick={() => handleClick(2)}></div>
      <div className='skill--notch' style={styler(3)} onClick={() => handleClick(3)}></div>
      <div className='skill--notch' style={styler(4)} onClick={() => handleClick(4)}></div>
      <div className='skill--notch' style={styler(5)} onClick={() => handleClick(5)}></div>
    </div>
  );
}
