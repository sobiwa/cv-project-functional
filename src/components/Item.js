import { useEffect, useRef } from 'react';
import InputChild from './InputChild';
import { DeleteButton } from './shared/helpers';

export default function Item({
  height,
  updateComponentHeight,
  section,
  set,
  location,
  duration,
  subChildren,
  deleteSubChild,
  handleBlur,
  id,
}) {
  const divElement = useRef(0);

  useEffect(() => {
    if (height === divElement.current.scrollHeight) return;
    updateComponentHeight(id, divElement.current.scrollHeight, set);
  });

  return (
    <div ref={divElement}>
      <InputChild
        className={`${section}--location`}
        text={location}
        type="text"
        handleBlur={handleBlur(set, 'location', [id])}
      />
      <InputChild
        className={`${section}--duration`}
        text={duration}
        type="text"
        handleBlur={handleBlur(set, 'duration', [id])}
      />
      <ul className={`section--sub-children`}>
        {subChildren.map((item) => (
          <li key={item.id}>
            <InputChild
              text={item.data.input}
              type="textarea"
              handleBlur={handleBlur(set, 'subChildren', [id, item.id])}
            />
            <DeleteButton
              onClick={() => deleteSubChild(id, item.id, set)}
              whatToDelete={'sub-child'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
