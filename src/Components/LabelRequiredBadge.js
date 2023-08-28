import {ReactComponent as RequiredBadge} from "./RequiredBadge.svg";

const LabelRequiredBadge = (labelValue) => {
  return (
    <div>
      <label>{labelValue.labelValue}</label>
      <RequiredBadge />
    </div>
  );
};

export default LabelRequiredBadge;
