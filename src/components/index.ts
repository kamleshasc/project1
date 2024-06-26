import CustomButton from './UI/CustomButton';
import CustomDropdown from './UI/CustomDropdown';
import CustomDropdownMultiSelect from './UI/CustomDropdownMultiSelect';
import CustomInput from './UI/CustomInput';
import CustomModalImagePicker from './UI/CustomModalImagePicker';
import DatePickerUI from './UI/DatePickerUI';
import TableHeader from './UI/TableHeader';
import TableItem from './UI/TableItem';
import TableRow from './UI/TableRow';
import ToastMessage from './UI/ToastMessage';
import DropDownWithItemList from './screen/Invoice/DropDownWithItemList';

const UI = {
  TableH: TableHeader,
  TableI: TableItem,
  TableR: TableRow,
  Toast: ToastMessage,
  DatePick: DatePickerUI,
  Btn: CustomButton,
  DropDown: CustomDropdown,
  DropDownMultiSelect: CustomDropdownMultiSelect,
  Input: CustomInput,
  ImagePickerModal: CustomModalImagePicker,
};

const SCREEN = {
  DropDownWithList: DropDownWithItemList,
};

export {UI, SCREEN};
