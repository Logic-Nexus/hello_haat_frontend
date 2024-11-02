import { useMemo } from "react";
import { useGetUserLastLoginInfoQuery } from "../../Store/feature/globalApi_Slice";
// import moment from "moment";
import useSocket from "../../Hook/useSocket/useSocket";
import { Show } from "easy-beauty-components---react";
import useTimeAgo from "../../Hook/useTimeAgo/useTimeAgo";

const Dashboard = () => {
  const socketContext = useSocket();
  const liveConnectedUsers = socketContext?.liveConnectedUsers || [];
  const {
    data: userLastLoginInfo,
    isLoading,
    isSuccess,
  } = useGetUserLastLoginInfoQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  // Extract the data from the response
  const loginData = isSuccess && userLastLoginInfo?.data;

  // Get the formatted login date using the useTimeAgo hook
  const timeAgo = useTimeAgo(loginData?.loginAt);

  // Format login date (optional) loginData?.loginAt
  const formattedLoginDate = useMemo(() => {
    return loginData ? timeAgo : "";
  }, [loginData, timeAgo]);

  // console.log(liveConnectedUsers, "liveConnectedUsers");
  //   [
  //     {
  //         "email": "admin@admin.com",
  //         "socketId": "IbWbETGM6N35LuqeAABT",
  //         "role": "ADMIN",
  //         "userUniqueId": "cm2p39mis0001ijvhvfhnmxa0",
  //         "vendorId": "cm2p39mis0000ijvh85q8mlcf"
  //     }
  // ]

  return (
    <div className="p-4">
      {loginData ? (
        <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-1">
          <h2 className="text-lg font-bold mb-2">Last Login Information</h2>
          <p className="text-gray-700">
            <span className="font-medium">Location:</span> {loginData.location}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Login Time:</span>{" "}
            {formattedLoginDate}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">IP Address:</span>{" "}
            {loginData.ipAddress}
          </p>
        </div>
      ) : (
        // <p className="text-gray-600">Loading last login information...</p>
        isLoading && (
          <p className="text-gray-600">Loading last login information...</p>
        )
      )}

      {/* Active Users List */}
      <Show when={liveConnectedUsers?.length > 0}>
        <section className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mt-5">
          <h2 className="text-lg font-bold mb-4">Live Connected Users</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {liveConnectedUsers.map((user: any) => (
              <div
                key={user.socketId}
                className="p-4 bg-gray-50 border border-gray-100 rounded-lg shadow-sm flex flex-col items-start space-y-1 hover:bg-blue-50 transition duration-200"
              >
                <h3 className="text-sm font-semibold text-gray-800">
                  {user.email}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {user?.role}
                </span>
                <p className="text-xs text-gray-500">ID: {user.userUniqueId}</p>
                {user.vendorId && (
                  <p className="text-xs text-gray-500">
                    Vendor: {user.vendorId}
                  </p>
                )}
                {user.IP && (
                  <p className="text-xs text-gray-500"> IP: {user.IP}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </Show>
    </div>
  );
};

export default Dashboard;
