import useTransfer from "../../../Components/Hooks/useTransfer";
import useUsers from "../../../Components/Hooks/useUsers";
import PieChartAdmin from "./PieChartAdmin";

const DashboardStat = () => {
  const { users } = useUsers();
  const { transfers } = useTransfer();

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="stats  shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Total User</div>
            <div className="stat-value">{users.length}</div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Send Money</div>
            <div className="stat-value ">{transfers.sendMoney}</div>
            <div className="stat-desc "></div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Cash In</div>
            <div className="stat-value">{transfers.cashIn}</div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Cash Out</div>
            <div className="stat-value">{transfers.cashOut}</div>
            <div className="stat-desc"></div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Total Transfers</div>
            <div className="stat-value">{transfers.grandTotal}</div>
            <div className="stat-desc"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <PieChartAdmin transfers={transfers}></PieChartAdmin>
      </div>
    </div>
  );
};

export default DashboardStat;
