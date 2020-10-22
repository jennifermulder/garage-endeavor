import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function UserProfile() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
///posts, post, postDate
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
            {/* <h2>Posted Products</h2>
            {user.posts.map((post) => (
              <div key={post._id} className="my-2">
                <h3>{new Date(parseInt(post.postDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {post.products.map(({ _id, image, name, price }, index) => (
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
            ))} */}
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
