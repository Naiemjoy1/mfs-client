import useAuth from "../../../Components/Hooks/useAuth";
import useRole from "../../../Components/Hooks/useRole";
import useTransfer from "../../../Components/Hooks/useTransfer";
import useUsers from "../../../Components/Hooks/useUsers";
import useUserTransfar from "../../../Components/Hooks/useUserTransfar";
import PieChartAdmin from "./PieChartAdmin";

const DashboardStat = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const currentUser = users.find((u) => u.email === user.email);
  // console.log(currentUser.balance);
  const { transfers } = useTransfer();
  const [userType] = useRole();
  // console.log(userType);
  const { userTransfers } = useUserTransfar();
  // console.log(userTransfers);

  return (
    <div>
      <div className="flex justify-center items-center">
        {userType === "admin" ? (
          <>
            <div className="stats  shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Total User</div>
                <div className="stat-value">{users?.length}</div>
                <div className="stat-desc"></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Send Money</div>
                <div className="stat-value ">{transfers?.sendMoney}</div>
                <div className="stat-desc "></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash In</div>
                <div className="stat-value">{transfers?.cashIn}</div>
                <div className="stat-desc"></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash Out</div>
                <div className="stat-value">{transfers?.cashOut}</div>
                <div className="stat-desc"></div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Total Transfers</div>
                <div className="stat-value">{transfers?.grandTotal}</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </>
        ) : userType === "agent" ? (
          <>
            <div className="stats  shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Current Balance</div>
                <div className="stat-value ">{currentUser?.balance}</div>
                <div className="stat-desc "></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash In</div>
                <div className="stat-value">{userTransfers?.totalCashIn}</div>
                <div className="stat-desc"></div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Total Cash Out</div>
                <div className="stat-value">{userTransfers?.totalCashOut}</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="stats  shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Current Balance</div>
                <div className="stat-value ">{currentUser?.balance}</div>
                <div className="stat-desc "></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Send Money</div>
                <div className="stat-value">
                  {userTransfers?.totalSendMoney}
                </div>
                <div className="stat-desc"></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash In</div>
                <div className="stat-value">{userTransfers?.totalCashIn}</div>
                <div className="stat-desc"></div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Total Cash Out</div>
                <div className="stat-value">{userTransfers?.totalCashOut}</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </>
        )}

        {/* {userType === "admin" ? (
          <>
            <div className="stats  shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Total User</div>
                <div className="stat-value">{users?.length}</div>
                <div className="stat-desc"></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Send Money</div>
                <div className="stat-value ">{transfers?.sendMoney}</div>
                <div className="stat-desc "></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash In</div>
                <div className="stat-value">{transfers?.cashIn}</div>
                <div className="stat-desc"></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash Out</div>
                <div className="stat-value">{transfers?.cashOut}</div>
                <div className="stat-desc"></div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Total Transfers</div>
                <div className="stat-value">{transfers?.grandTotal}</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="stats  shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Current Balance</div>
                <div className="stat-value ">{currentUser?.balance}</div>
                <div className="stat-desc "></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Send Money</div>
                <div className="stat-value">
                  {userTransfers?.totalSendMoney}
                </div>
                <div className="stat-desc"></div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Total Cash In</div>
                <div className="stat-value">{userTransfers?.totalCashIn}</div>
                <div className="stat-desc"></div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Total Cash Out</div>
                <div className="stat-value">{userTransfers?.totalCashOut}</div>
                <div className="stat-desc"></div>
              </div>
            </div>
          </>
        )} */}
      </div>
      <div className="flex justify-center items-center">
        {userType === "admin" ? (
          <>
            <PieChartAdmin transfers={transfers}></PieChartAdmin>
          </>
        ) : userType === "agent" ? (
          <>agent</>
        ) : (
          <>user</>
        )}
      </div>
    </div>
  );
};

export default DashboardStat;
