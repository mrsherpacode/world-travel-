import { useSearchParams } from "react-router-dom";
// This is a custom hook that gets the lat and lng from url when click on Map

function UseUrlPosition() {
  // This will get lat and lang from url and we use useSearchParams hook  for that
  const [searchParam, setSearchParam] = useSearchParams();
  // here i'm using get method to get the position lat and lng cuz we directly can not access it.
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return [lat, lng];
}
export { UseUrlPosition };
