import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProductList from "../components/UserProductList";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import ProductItem from "../components/ProductItem";

const UserBackground = styled.div`
  background-image: url('https://garageendeavor.s3.us-west-1.amazonaws.com/user-background.jpg');
  height: inherit;
  background-size: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBackground = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  z-index: 0;
  width: 80%;
  padding: 20px;
  margin: 90px 0 50px 0;
`;

function UserProfile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <UserBackground>
      <WhiteBackground className="adjustment">
        <Link to="/buy">← Back to Items</Link>
        {user ? (
          <>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <br />
            <h2>Posted Products</h2>
            <UserProductList />
            <br />
            <h2>Order History</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price, quantity }, index) => (
                    <ProductItem
                      key= {_id}
                      _id={_id}
                      image={image}
                      name={name}
                      price={price}
                      quantity={quantity}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </WhiteBackground>
    </UserBackground>
  );
}

export default UserProfile;