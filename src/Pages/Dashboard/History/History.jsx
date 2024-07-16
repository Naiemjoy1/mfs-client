import moment from "moment";
import useAuth from "../../../Components/Hooks/useAuth";
import useLogs from "../../../Components/Hooks/useLogs";
import useUsers from "../../../Components/Hooks/useUsers";

const History = () => {
  const { user } = useAuth();
  const [logs] = useLogs();
  const { users } = useUsers();
  const currentUser = users.find((users) => users.email === user.email);

  let userLogs = [];
  if (currentUser && currentUser.userType === "agent") {
    userLogs = logs
      .filter((log) => log.sender === user.email || log.receiver === user.email)
      .slice(0, 20);
  } else {
    userLogs = logs
      .filter((log) => log.sender === user.email || log.receiver === user.email)
      .slice(0, 10);
  }

  return (
    <div>
      <p>History: {userLogs.length}</p>
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userLogs.map((log, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{log.sender}</td>
                  <td>{log.receiver}</td>
                  <td>{log.type}</td>
                  <td>{log.amount}</td>
                  <td>{moment(log.timestamp).format("YYYY-MM-DD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
