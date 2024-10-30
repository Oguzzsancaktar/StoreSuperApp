import { InputStyled } from '../input';

interface IProps {
  handleMostSearched: (state: boolean) => void;
}
const FilterSearchbar: React.FC<IProps> = ({ handleMostSearched }) => {
  const handleBlur = () => {
    handleMostSearched(false);
  };

  const handleFocus = () => {
    handleMostSearched(true);
  };

  return (
    <InputStyled
      handleBlur={handleBlur}
      handleFocus={handleFocus}
      placeholder="Search"
      name="filterSearchbar"
      type="text"
    />
  );
};

export default FilterSearchbar;
