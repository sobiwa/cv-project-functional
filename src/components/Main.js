import { useState, useEffect } from 'react';
import {
  handleBlur,
  newItem,
  retrieveDataOrRenderDefault,
} from './shared/helpers';
import Header from './Header';
import Sidebar from './Sidebar';
import PageMain from './PageMain';
import Profile from './Profile';
import layoutIcon from '../assets/layout.svg';
import Layout from './Layout';
import uniqid from 'uniqid';

export default function Main() {
  const newTask = () => ({
    id: uniqid(),
    data: newItem(
      'Pet cats and ensured they received abundant quantities of love.'
    ),
  });
  const newDetail = () => ({
    id: uniqid(),
    data: newItem('GPA: 4.0'),
  });

  const createNewEmployment = () => {
    return {
      id: uniqid(),
      location: newItem('Cat Consultant at Feline Corp., New York'),
      duration: newItem('April 1993 - February 2023'),
      subChildren: [newTask()],
      height: 0,
    };
  };

  const createNewEducation = () => {
    return {
      id: uniqid(),
      location: newItem('Bachelor of Science, Cat University'),
      duration: newItem('August 2003 - May 2007'),
      subChildren: [newDetail()],
      height: 0,
    };
  };

  const createNewReference = () => {
    return {
      id: uniqid(),
      contact: newItem('Joey Pantalones'),
      email: newItem('joeyPants@pmail.com'),
      phone: newItem('(444) 555 - 6666'),
      height: 0,
    };
  };

  const creator = (section) => {
    switch (section) {
      case 'employment':
        return createNewEmployment();
      case 'education':
        return createNewEducation();
      case 'references':
        return createNewReference();
      default:
        return;
    }
  };

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile')) || {
      text: newItem(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae enim ac enim mattis luctus. Maecenas ut velit mauris. Donec pretium elit porttitor augue condimentum, eget vulputate nibh ultrices.'
      ),
      height: 0,
    }
  );

  const [employment, setEmployment] = useState(
    retrieveDataOrRenderDefault('employment', creator)
  );
  const [education, setEducation] = useState(
    retrieveDataOrRenderDefault('education', creator)
  );
  const [references, setReferences] = useState(
    retrieveDataOrRenderDefault('references', creator)
  );
  const [height, setHeight] = useState({});

  const [layoutDisplay, setLayoutDisplay] = useState({
    image: true,
    jobTitle: true,
    details: true,
    skills: true,
    links: true,
    profile: true,
    employment: true,
    education: true,
    references: true,
    phone: true,
  });

  const [showLayoutDisplay, setShowLayoutDisplay] = useState(false);

  const toggleDisplay = (area, subArea) => {
    setLayoutDisplay((prev) => ({
      ...prev,
      [area]: { ...prev[area], [subArea]: !prev[area][subArea] },
    }));
  };

  const updateProfile = (newText) => {
    setProfile((prev) => ({
      ...prev,
      text: {
        ...prev.text,
        input: newText === '' ? prev.text.default : newText,
      },
    }));
  };

  const updateProfileHeight = (newHeight) => {
    setProfile((prev) => ({ ...prev, height: newHeight }));
  };

  const addItem = (section, set) => {
    set((prevState) => [...prevState, creator(section)]);
  };

  const deleteItem = (id, set) => {
    set((prevState) => prevState.filter((item) => item.id !== id));
  };

  const addSubChild = (section, id, set) => {
    const subCreator = section === 'employment' ? newTask : newDetail;
    set((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, subChildren: [...item.subChildren, subCreator()] }
          : item
      )
    );
  };

  const deleteSubChild = (id, nestedId, set) => {
    set((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              subChildren: item.subChildren.filter(
                (nested) => nested.id !== nestedId
              ),
            }
          : item
      )
    );
  };

  const distributeItems = () => {
    let currentPageNumber = 1;
    const fullPageLength = height.page * 0.93;
    const titleHeight = height.heading;
    function newPage(num) {
      return {
        pageNum: num,
        employment: [],
        education: [],
        references: [],
        totalLength: 0,
      };
    }
    const newPages = [
      { ...newPage(1), totalLength: height.header + profile.height },
    ];
    let [page] = newPages;

    const layoutSection = (section) => {
      const stateVar =
        section === 'employment'
          ? employment
          : section === 'education'
          ? education
          : references;
      page.totalLength += titleHeight;
      const sectionCopy = [...stateVar];
      let currentItem;
      while (sectionCopy.length) {
        currentItem = sectionCopy.shift();
        const defaultItemHeight = fullPageLength * 0.07;
        const margin = defaultItemHeight * 0.1;
        let currHeight =
          currentItem.height === 0 ? defaultItemHeight : currentItem.height;
        currHeight += margin;
        if (currHeight + page.totalLength > fullPageLength) {
          currentPageNumber += 1;
          page = newPage(currentPageNumber);
          newPages.push(page);
        }
        page.totalLength += currHeight;
        page[section].push(currentItem);
      }
    };

    layoutSection('employment');
    layoutSection('education');
    layoutSection('references');

    const filteredPages = newPages.map((item) => ({
      pageNum: item.pageNum,
      employment: item.employment,
      education: item.education,
      references: item.references,
    }));

    return filteredPages;
  };

  const updateComponentHeight = (id, newHeight, set) => {
    set((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, height: newHeight } : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('employment', JSON.stringify(employment));
  }, [employment]);

  useEffect(() => {
    localStorage.setItem('education', JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem('references', JSON.stringify(references));
  }, [references]);

  const updateHeights = () => {
    setHeight({
      page: document.querySelector('.page').clientHeight,
      header: document.querySelector('.header').scrollHeight,
      heading: document.querySelector('.main--title').scrollHeight,
    });
  };

  useEffect(() => {
    updateHeights();
    window.addEventListener('resize', updateHeights);

    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  const pages = distributeItems();
  return (
    <div className="page-container">
      <button className="layout-button" type="button" onClick={() => setShowLayoutDisplay(prev => !prev)}>
        <img src={layoutIcon} alt="layout settings" />
      </button>
      {showLayoutDisplay && <Layout layoutDisplay={layoutDisplay} setLayoutDisplay={setLayoutDisplay} hide={setShowLayoutDisplay}/>}
      {pages.map((item) =>
        item.pageNum === 1 ? (
          <div key={item.pageNum} className="page page-one">
            <Header />
            <Sidebar />
            <main>
              <Profile
                pageHeight={height.page}
                handleBlur={updateProfile}
                height={profile.height}
                updateHeight={updateProfileHeight}
                text={profile.text.input}
              />
              <PageMain
                employment={item.employment}
                setEmployment={setEmployment}
                education={item.education}
                setEducation={setEducation}
                references={item.references}
                setReferences={setReferences}
                handleBlur={handleBlur}
                addItem={addItem}
                deleteItem={deleteItem}
                addSubChild={addSubChild}
                deleteSubChild={deleteSubChild}
                updateComponentHeight={updateComponentHeight}
              />
            </main>
          </div>
        ) : (
          <div className="page" key={item.pageNum}>
            <PageMain
              employment={item.employment}
              setEmployment={setEmployment}
              education={item.education}
              setEducation={setEducation}
              references={item.references}
              setReferences={setReferences}
              handleBlur={handleBlur}
              addItem={addItem}
              deleteItem={deleteItem}
              addSubChild={addSubChild}
              deleteSubChild={deleteSubChild}
              updateComponentHeight={updateComponentHeight}
            />
          </div>
        )
      )}
    </div>
  );
}
