import { useState, useEffect } from 'react';
import {
  newItem,
  retrieveDataOrRenderDefault,
  creator,
} from './shared/helpers';
import Header from './Header';
import Sidebar from './Sidebar';
import PageMain from './PageMain';
import Profile from './Profile';
import layoutIcon from '../assets/layout.svg';
import Layout from './Layout';

export default function Main() {

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
    skillScale: true,
    links: true,
    linksImg: true,
    linksDescription: true,
    profile: true,
    employment: true,
    education: true,
    references: true,
    phone: true,
  });

  const [showLayoutDisplay, setShowLayoutDisplay] = useState(false);

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

  const distributeItems = () => {
    let currentPageNumber = 1;
    const fullPageLength = height.page * 0.92;
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
      <button
        className="layout-button"
        type="button"
        onClick={() => setShowLayoutDisplay((prev) => !prev)}
      >
        <img src={layoutIcon} alt="layout settings" />
      </button>
      {showLayoutDisplay && (
        <Layout
          layoutDisplay={layoutDisplay}
          setLayoutDisplay={setLayoutDisplay}
          hide={setShowLayoutDisplay}
        />
      )}
      {pages.map((item) =>
        item.pageNum === 1 ? (
          <div key={item.pageNum} className="page page-one">
            <Header
              display={{
                image: layoutDisplay.image,
                jobTitle: layoutDisplay.jobTitle,
              }}
            />
            <Sidebar
              display={{
                details: layoutDisplay.details,
                skills: layoutDisplay.skills,
                links: layoutDisplay.links,
                linksImg: layoutDisplay.linksImg,
                linksDescription: layoutDisplay.linksDescription,
                scale: layoutDisplay.skillScale,
              }}
            />
            <main>
              {layoutDisplay.profile && (
                <Profile
                  pageHeight={height.page}
                  handleBlur={updateProfile}
                  height={profile.height}
                  updateHeight={updateProfileHeight}
                  text={profile.text.input}
                />
              )}
              <PageMain
                display={{
                  employment: layoutDisplay.employment,
                  education: layoutDisplay.education,
                  references: layoutDisplay.references,
                  phone: layoutDisplay.phone,
                }}
                employment={item.employment}
                setEmployment={setEmployment}
                education={item.education}
                setEducation={setEducation}
                references={item.references}
                setReferences={setReferences}
              />
            </main>
          </div>
        ) : (
          <div className="page" key={item.pageNum}>
            <PageMain
              display={{
                employment: layoutDisplay.employment,
                education: layoutDisplay.education,
                references: layoutDisplay.references,
                phone: layoutDisplay.phone,
              }}
              employment={item.employment}
              setEmployment={setEmployment}
              education={item.education}
              setEducation={setEducation}
              references={item.references}
              setReferences={setReferences}
            />
          </div>
        )
      )}
    </div>
  );
}
