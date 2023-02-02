export function handleBlur (section, id, target) {
  return (newText) => {
    this.setState((prevState) => {
      return {
        [section]: prevState[section].map((item) =>
          item.id === id
            ? {
                ...item,
                [target]: {
                  ...item[target],
                  input: newText === '' ? item[target].default : newText,
                },
              }
            : item
        ),
      };
    });
  };
};