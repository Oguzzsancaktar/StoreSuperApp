import { InputStyled } from '../input';

interface IProps {
  handleMostSearched: (state: boolean) => void;
  handleChange(val: string): void;
}
const FilterSearchbar: React.FC<IProps> = ({
  handleMostSearched,
  handleChange,
}) => {
  const handleBlur = () => {
    handleMostSearched(false);
  };

  const handleFocus = () => {
    handleMostSearched(true);
  };

  return (
    <InputStyled
      onChangeText={handleChange}
      handleBlur={handleBlur}
      handleFocus={handleFocus}
      placeholder="Search"
      name="filterSearchbar"
      type="text"
    />
  );
};

export default FilterSearchbar;
