import { useMemo, useState } from "react";
import { useGetOrderListQuery } from "../../Store/feature/OrderList/orderList_api_slice";
import MainCard from "../../Utils/CCard/MainCard";
import { Show } from "easy-beauty-components---react";
import { CPagination, CSkeleton } from "../../Utils";
import NotFoundData from "../../Components/NotFoundData/NotFoundData";
import MainTable from "../../Utils/MainTable/MainTable";
import { themeColor } from "../../constant";
import moment from "moment";
import textFormatter from "text-formatter-js";

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status] = useState("");
  // ==================== get product order list ====================
  const {
    data: orderList,
    // isLoading,
    isFetching,
    // isError,
    isSuccess,
  } = useGetOrderListQuery(
    {
      ...(status && { status }),
      pagination: true,
      pageNumber: currentPage,
    },
    {
      // refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    }
  );

  //==================== table data ======================
  const tableData = useMemo(() => {
    if (isSuccess) {
      return orderList?.data?.results?.map((item: any) => {
        return {
          date: moment(item.orderDate).format("DD-MM-YYYY hh:mm A"),
          product: (
            <span className="flex justify-start flex-col">
              {item.product?.product_name}
              <small className="font-bold">
                ({item.product?.product_code})
              </small>
            </span>
          ),
          zone: (
            <span className="flex justify-start flex-col ">
              {item?.zone?.zone_name}
              <small className="font-bold">({item?.zone?.contact_no})</small>
            </span>
          ),
          orderBy: (
            <span className="flex justify-start flex-col ">
              {item?.orderBy?.firstName} {item?.orderBy?.lastName}
              <small className="font-bold">
                ({textFormatter(item?.orderBy?.role)})
              </small>
              <small className="font-bold">
                ({item?.orderBy?.userUniqueId})
              </small>
            </span>
          ),
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount,
          tax: item.tax,
          deliveryCharge: item.deliveryCharge,
          subtotal: item.subtotal,
          totalAmount: item.totalAmount,
          status: (
            <small
              className={`
                ${
                  item.orderStatus?.toLowerCase() === "pending" &&
                  "bg-orange-500"
                }
                ${
                  item.orderStatus?.toLowerCase() === "processing" &&
                  "bg-blue-500"
                }
                ${
                  item.orderStatus?.toLowerCase() === "completed" &&
                  "bg-green-500"
                }
                ${item.orderStatus?.toLowerCase() === "cancel" && "bg-red-500"}
                ${item.orderStatus?.toLowerCase() === "refund" && "bg-pink-500"}
                text-white px-2 py-1 rounded text-xs font-bold

                `}
            >
              {item.orderStatus}
            </small>
          ),
        };
      });
    }
    return [];
  }, [isSuccess, orderList?.data?.results]);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${orderList?.data?.results?.length}/${orderList?.data?.count})`
    : "";

  return (
    <MainCard title={`All Orders ${showCountInData}`}>
      {/* table section */}
      <Show
        when={!isFetching && tableData?.length > 0}
        FallBack={
          <>
            {isFetching ? (
              // <Loader />
              <CSkeleton />
            ) : (
              <NotFoundData title="Order" />
            )}
          </>
        }
      >
        <section className="max-h-[calc(100vh-290px)] overflow-y-scroll">
          <MainTable
            data={tableData || []}
            filter={tableData || []}
            tableHeaderDesign={{
              backgroundColor: themeColor?.primary,
              color: themeColor?.light_text_color,
            }}
            dense
            // sticky
            // bulkSelection
            // checked
            // onSelectAllClick={() => console.log("Selected All")}
          />
        </section>

        {/* pagination section */}
        <Show when={orderList?.data?.totalPages > 1}>
          <CPagination
            currentPage={orderList?.data?.currentPage}
            totalPages={orderList?.data?.totalPages}
            data={orderList?.data}
            handlePageChange={function (newPage: number): void {
              // console.log(newPage);
              setCurrentPage(newPage);
            }}
          />
        </Show>
      </Show>
    </MainCard>
  );
};

export default AllOrders;
