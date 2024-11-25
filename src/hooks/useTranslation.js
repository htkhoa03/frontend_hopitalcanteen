import { useSelector } from "react-redux";
import languageDictionary from "../utils/languageDictionary";

const useTranslation = () => {
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux
  return languageDictionary[language]; // Trả về nội dung ngôn ngữ hiện tại
};

export default useTranslation;
