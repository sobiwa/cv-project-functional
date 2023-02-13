import { useState, useEffect } from 'react';
import { newItem } from './shared/helpers';
import InputChild from './InputChild';
import profileImg from '../assets/profile.svg';

export default function Header({ display }) {
  const createNewName = () => ({
    first: newItem('First Name'),
    last: newItem('Last Name'),
  });
  const createNewJob = () => ({ title: newItem('job title') });
  const creator = (section) =>
    section === 'name' ? createNewName : createNewJob;

  const retrieveDataOrRenderDefault = (section) => {
    const dataRetrieved = JSON.parse(localStorage.getItem(section));
    return dataRetrieved ? dataRetrieved : creator(section);
  };

  const [imgSrc, setImgSrc] = useState(profileImg);
  const [name, setName] = useState(retrieveDataOrRenderDefault('name'));
  const [job, setJob] = useState(retrieveDataOrRenderDefault('job'));

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem('job', JSON.stringify(job));
  }, [job]);

  const loadImg = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleBlur = (target, set) => {
    return (newText) => {
      set((prev) => ({
        ...prev,
        [target]: {
          ...prev[target],
          input: newText === '' ? prev[target].default : newText,
        },
      }));
    };
  };

  return (
    <div className="header">
      {display.image && (
        <div className="header--image">
          <label htmlFor="img-upload" className="header--image-upload-label">
            <img
              className="header--image-upload-image"
              alt="user"
              src={imgSrc}
            />
          </label>
          <input
            id="img-upload"
            className="header--image-upload"
            type="file"
            accept="image/*"
            onChange={loadImg}
          />
        </div>
      )}
      <div className="header--text">
        <div className="name">
          <InputChild
            type="text"
            text={name.first.input}
            handleBlur={handleBlur('first', setName)}
          />
          <InputChild
            type="text"
            text={name.last.input}
            handleBlur={handleBlur('last', setName)}
          />
        </div>
        {display.jobTitle && (
          <InputChild
            className="header--job-title"
            type="text"
            text={job.title.input}
            handleBlur={handleBlur('title', setJob)}
          />
        )}
      </div>
    </div>
  );
}
