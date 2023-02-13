import { useState, useEffect } from 'react';
import InputChild from './InputChild';
import SkillVisual from './SkillVisual';
import uniqid from 'uniqid';
import linkIcon from '../assets/link.svg';
import linkOffIcon from '../assets/link-off.svg';
import {
  handleBlur,
  newItem,
  retrieveDataOrRenderDefault,
} from './shared/helpers';
import { DeleteButton, AddButton } from './shared/buttons'

export default function Sidebar({ display }) {
  const createNewDetails = () => ({
    address1: newItem('Address'),
    address2: newItem('Address'),
    phone: newItem('Phone number'),
    email: newItem('email@example.com'),
  });

  const createNewSkill = () => ({
    id: uniqid(),
    text: newItem('new skill'),
    scale: 5,
  });
  const createNewLink = () => ({
    id: uniqid(),
    description: newItem('new link'),
    url: newItem('example.com'),
  });

  const creator = (section) =>
    section === 'skills' ? createNewSkill() : createNewLink();

  const [details, setDetails] = useState(
    JSON.parse(localStorage.getItem('details')) || createNewDetails()
  );
  const [skills, setSkills] = useState(
    retrieveDataOrRenderDefault('skills', creator)
  );
  const [links, setLinks] = useState(
    retrieveDataOrRenderDefault('links', creator)
  );
  const [linksOn, setLinksOn] = useState(false);

  const updateDetails = (target) => {
    return (newText) => {
      setDetails((prev) => ({
        ...prev,
        [target]: {
          ...prev[target],
          input: newText === '' ? prev[target].default : newText,
        },
      }));
    };
  };

  const addItem = (section, set) => {
    set((prev) => [...prev, creator(section)]);
  };

  const deleteItem = (id, set) => {
    set((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLinkClick = (e) => {
    if (!linksOn) {
      e.preventDefault();
    }
  };

  const adjustSkillScale = (id) => {
    return (num) => {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === id ? { ...skill, scale: num } : skill
        )
      );
    };
  };

  useEffect(() => {
    localStorage.setItem('details', JSON.stringify(details));
  }, [details]);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);
  return (
    <div className="sidebar">
      {display.details && (
        <div className="sidebar--section sidebar--details">
          <h4 className="sidebar--title">Details</h4>
          <InputChild
            type="text"
            text={details.address1.input}
            handleBlur={updateDetails('address1')}
          />
          <InputChild
            type="text"
            text={details.address2.input}
            handleBlur={updateDetails('address2')}
          />
          <InputChild
            type="tel"
            text={details.phone.input}
            handleBlur={updateDetails('phone')}
          />
          <InputChild
            type="email"
            text={details.email.input}
            handleBlur={updateDetails('email')}
          />
        </div>
      )}
      {display.skills && (
        <div className="sidebar--section sidebar--skills">
          <h4 className="sidebar--title">Skills</h4>
          {skills.map((skill) => {
            return (
              <div key={skill.id} className={`sidebar--skill ${display.scale ? '' : 'skill--scaleless'}`}>
                <InputChild
                  type="text"
                  text={skill.text.input}
                  handleBlur={handleBlur(setSkills, 'text', [skill.id])}
                />
                {display.scale && <SkillVisual num={skill.scale} id={skill.id} handleClick={adjustSkillScale(skill.id)}/>}
                <DeleteButton
                  onClick={() => deleteItem(skill.id, setSkills)}
                  whatToDelete="skill"
                />
              </div>
            );
          })}
          <AddButton
            onClick={() => addItem('skills', setSkills)}
            whatToAdd="skill"
          />
        </div>
      )}
      {display.links && (
        <div className="sidebar--section sidebar--links">
          <h4 className="sidebar--title">Links</h4>
          {links.map((link) => {
            return (
              <div key={link.id} className="sidebar--link">
                <InputChild
                  type="text"
                  text={link.description.input}
                  handleBlur={handleBlur(setLinks, 'description', [link.id])}
                />
                <a
                  style={{ cursor: linksOn ? 'pointer' : 'text' }}
                  onClick={handleLinkClick}
                  href={`https://${link.url.input}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <InputChild
                    type="text"
                    text={link.url.input}
                    handleBlur={handleBlur(setLinks, 'url', [link.id])}
                  />
                </a>
                <DeleteButton
                  onClick={() => deleteItem(link.id, setLinks)}
                  whatToDelete="link"
                />
              </div>
            );
          })}
          <div className="flex-buttons">
            <AddButton
              onClick={() => addItem('links', setLinks)}
              whatToAdd="link"
            />
            <button
              title="Toggle link functionality"
              className="icon-button link-toggle-button"
              type="button"
              onClick={() => setLinksOn((prev) => !prev)}
            >
              <img
                src={linksOn ? linkOffIcon : linkIcon}
                alt="toggle link functionality"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
