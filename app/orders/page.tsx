import OrdersClient from "./OrderClient";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async() => {

    const user = await getCurrentUser();
    if (!user) {
      return <NullData title="Oops! Access denied." />;
    }
  
    const orders = await getOrdersByUserId(user.id);
  
    return (
      <div className="pt-8">
        <Container>
          <OrdersClient orders={orders} />
        </Container>
      </div>
    );
  };
 
export default Orders;