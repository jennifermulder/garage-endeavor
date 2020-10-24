import React from "react";
import { Link } from "react-router-dom";
import UserProductList from "../components/UserProductList";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function UserProfile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }


  // data.products.filter(product => product.user._id == Auth.getProfile().data._id)
///posts, post, postDate
//filter for products.seller, display products
//create userproduct list and pass that component into the use profile page??

// return state.products.filter(product => product.seller?._id === seller Id???);
//need to be able to pass id Auth.token?


// if (req.headers.authorization) {
//   token = token
//     .split(' ')
//     .pop()
//     .trim();


// }
  return (
    <>
      <div className="container my-1">
        <Link to="/buy">
          ← Back to Items
          </Link>

        {user ? (
          <>
            <h1>{user.firstName} {user.lastName}</h1>
            <br />
            <h2>Posted Products</h2>
            <UserProductList />
            <br />  
            <h2>Order History</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img
                          alt={name}
                          src={`/images/${image}`}
                        />
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

      </div>

    </>)

};

export default UserProfile;
