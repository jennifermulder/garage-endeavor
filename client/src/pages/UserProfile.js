import React from "react";
import styled from "styled-components";
import userPattern from "../assets/images/user-background.jpg";
import { Link } from "react-router-dom";
import UserProductList from "../components/UserProductList";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";

const UserBackground = styled.div`
  background-image: url(${userPattern});
  height: 100vh;
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
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
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
