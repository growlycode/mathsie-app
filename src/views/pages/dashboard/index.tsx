/* eslint-disable jsx-a11y/anchor-is-valid */
import { auth } from "../../../api/firebase-init";
import { useAuth } from "../../../auth/hooks";
import { LatestWorkbooks } from "./marker/latest-workbooks";


const DashboardPage = function () {


  const { isMarker } = useAuth(auth);

  return (
    <div>
      {isMarker
        ? <LatestWorkbooks />
        : <div>Student dashboard</div>
      }
    </div>
  );
};


export default DashboardPage;
