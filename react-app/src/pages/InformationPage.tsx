import { ReactElement } from "react";
import { BODY_CLASSES, H_1 } from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import test2 from "../assets/images/test2.png";

export default function InformationPage(): ReactElement {
  TrackPageViewIfEnabled();

  var pageTitle: string = "Information";

  return (
    <>
      <div className={BODY_CLASSES}>
        <div className={H_1}>{pageTitle}</div>
        <div className="divider pt-4">Immune Discover</div>
        <p className="pb-8 text-justify">
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus. Quisque urna enim,
          placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in
          metus lobortis, eu euismod magna dignissim. Duis nec condimentum
          purus. Quisque urna enim, placerat non fermentum sed, pharetra sit
          amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna
          dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non
          fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus
          lobortis, eu euismod magna dignissim. Duis nec condimentum purus.
          Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam.
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus. Quisque urna enim,
          placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in
          metus lobortis, eu euismod magna dignissim. Duis nec condimentum
          purus. Quisque urna enim, placerat non fermentum sed, pharetra sit
          amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna
          dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non
          fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus
          lobortis, eu euismod magna dignissim. Duis nec condimentum purus.
          Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam.
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus.{" "}
        </p>
        <div className="divider pt-4">Populations</div>
        <p className="pb-4 text-justify">
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus. Quisque urna enim,
          placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in
          metus lobortis, eu euismod magna dignissim. Duis nec condimentum
          purus. Quisque urna enim, placerat non fermentum sed, pharetra sit
          amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna
          dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non
          fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus
          lobortis, eu euismod magna dignissim. Duis nec condimentum purus.
          Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam.
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus. Quisque urna enim,
          placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in
          metus lobortis, eu euismod magna dignissim. Duis nec condimentum
          purus. Quisque urna enim, placerat non fermentum sed, pharetra sit
          amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna
          dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non
          fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus
          lobortis, eu euismod magna dignissim. Duis nec condimentum purus.
          Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam.
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus.{" "}
        </p>
        <div className="pb-8 grid grid-cols-2 gap-4">
          <img src={test2} alt="Test" className="colspan-1" />
          <img src={test2} alt="Test" className="colspan-1" />
        </div>
        <div className="divider pt-4">lgBLASTn</div>
        <div className="divider pt-4">IGH</div>
        <div className="divider pt-4">...</div>
      </div>
    </>
  );
}
