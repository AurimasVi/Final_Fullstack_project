export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    height: "3rem",
    borderRadius: "1rem",
    fontSize: "1.2rem",
    paddingLeft: "1rem",
    color: "black",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(97, 57, 13, 0.73)" : "white",
  }),
};
