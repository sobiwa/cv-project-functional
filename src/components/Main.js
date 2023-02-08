import { Component } from 'react';
import { handleBlur } from './shared/helpers';
import PageOne from './PageOne';
import PageMain from './PageMain';
import uniqid from 'uniqid';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = handleBlur.bind(this);
  }

  newItem = (defaultText) => ({ input: defaultText, default: defaultText });
  newTask = () => ({
    id: uniqid(),
    data: this.newItem(
      'Pet cats and ensured they received abundant quantities of love.'
    ),
  });
  newDetail = () => ({
    id: uniqid(),
    data: this.newItem('GPA: 4.0'),
  });

  createNewEmployment = () => {
    return {
      id: uniqid(),
      location: this.newItem('Cat Consultant at Feline Corp., New York'),
      duration: this.newItem('April 1993 - February 2023'),
      subChildren: [this.newTask()],
      height: 0,
    };
  };

  createNewEducation = () => {
    return {
      id: uniqid(),
      location: this.newItem('Bachelor of Science, Cat University'),
      duration: this.newItem('August 2003 - May 2007'),
      subChildren: [this.newDetail()],
      height: 0,
    };
  };

  createNewReference = () => {
    return {
      id: uniqid(),
      contact: this.newItem('Joey Pantalones'),
      email: this.newItem('joeyPants@pmail.com'),
      phone: this.newItem('(444) 555 - 6666'),
      height: 0,
    };
  };

  creator = (section) => {
    switch (section) {
      case 'employment':
        return this.createNewEmployment();
      case 'education':
        return this.createNewEducation();
      case 'references':
        return this.createNewReference();
      default:
        return;
    }
  };

  retrieveDataOrRenderDefault = (section) => {
    const dataRetrieved = JSON.parse(localStorage.getItem(section));
    return dataRetrieved && dataRetrieved.length
      ? dataRetrieved
      : [this.creator(section)];
  };

  state = {
    employment: this.retrieveDataOrRenderDefault('employment'),
    education: this.retrieveDataOrRenderDefault('education'),
    references: this.retrieveDataOrRenderDefault('references'),
    height: {},
  };

  addItem = (section) => {
    this.setState((prevState) => ({
      [section]: [...prevState[section], this.creator(section)],
    }));
  };

  deleteItem = (id, section) => {
    this.setState((prevState) => ({
      [section]: prevState[section].filter((item) => item.id !== id),
    }));
  };

  addSubChild = (section, id) => {
    const subCreator = section === 'employment' ? this.newTask : this.newDetail;
    this.setState((prevState) => ({
      [section]: prevState[section].map((item) =>
        item.id === id
          ? { ...item, subChildren: [...item.subChildren, subCreator()] }
          : item
      ),
    }));
  };

  deleteSubChild = (section, id, nestedId) => {
    this.setState((prevState) => ({
      [section]: prevState[section].map((item) =>
        item.id === id
          ? {
              ...item,
              subChildren: item.subChildren.filter(
                (nested) => nested.id !== nestedId
              ),
            }
          : item
      ),
    }));
  };

  distributeItems = () => {
    console.log(this.state.height);
    let currentPageNumber = 1;
    const fullPageLength = this.state.height.page * 0.93;
    const titleHeight = fullPageLength * 0.05;
    function newPage(num) {
      return {
        pageNum: num,
        employment: [],
        education: [],
        references: [],
        totalLength: 0,
      };
    }
    const { header, profile } = this.state.height;
    const newPages = [{ ...newPage(1), totalLength: header + profile }];
    let [page] = newPages;

    const layoutSection = (section) => {
      page.totalLength += titleHeight;
      const sectionCopy = [...this.state[section]];
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
    }

    layoutSection('employment');
    layoutSection('education');
    layoutSection('references');

    const filteredPages = newPages.map((item) => ({
      pageNum: item.pageNum,
      employment: item.employment,
      education: item.education,
      references: item.references
    }));

    return filteredPages;
  };

  updateComponentHeight = (section, id, newHeight) => {
    this.setState((prevState) => ({
      [section]: prevState[section].map((item) =>
        item.id === id ? { ...item, height: newHeight } : item
      ),
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('employment', JSON.stringify(this.state.employment));
    localStorage.setItem('education', JSON.stringify(this.state.education));
    localStorage.setItem('references', JSON.stringify(this.state.references));
    if (this.checkSizes()) return;
    this.updateHeights();
  }

  updateHeights = () => {
    this.setState({
      height: {
        page: document.querySelector('.page').clientHeight,
        header: document.querySelector('.header').scrollHeight,
        profile: document.querySelector('.profile').scrollHeight,
      },
    });
  };

  handleWindowResize = () => {
    this.updateHeights();
  };

  checkSizes = () =>
    this.state.height.page === document.querySelector('.page').clientHeight &&
    this.state.height.header ===
      document.querySelector('.header').scrollHeight &&
    this.state.height.profile ===
      document.querySelector('.profile').scrollHeight;

  componentDidMount() {
    console.log('Main component mounted');
    this.updateHeights();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    console.log('main component unmounted');
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    const pages = this.distributeItems();
    return (
      <div className="page-container">
        {pages.map((item) =>
          item.pageNum === 1 ? (
            <PageOne
              key={item.pageNum}
              employment={item.employment}
              education={item.education}
              references={item.references}
              handleBlur={this.handleBlur}
              addItem={this.addItem}
              deleteItem={this.deleteItem}
              addSubChild={this.addSubChild}
              deleteSubChild={this.deleteSubChild}
              updateComponentHeight={this.updateComponentHeight}
            />
          ) : (
            <div className="page" key={item.pageNum}>
              <PageMain
                employment={item.employment}
                education={item.education}
                references={item.references}
                handleBlur={this.handleBlur}
                addItem={this.addItem}
                deleteItem={this.deleteItem}
                addSubChild={this.addSubChild}
                deleteSubChild={this.deleteSubChild}
                updateComponentHeight={this.updateComponentHeight}
              />
            </div>
          )
        )}
      </div>
    );
  }
}
