import React from "react";
import UserProductList from "../components/UserProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

//cart???
const UserPage = () => {
  return (
    <div className="container">
      <h1>Username</h1>
      <h2>Email</h2>
      <UserProductList />
      <Cart />
    </div>
  );
};
// const Home = () => {
//   const [currentCategory, setCategory] = useState("");

//   return (
//     <div className="container">
//       <CategoryMenu setCategory={setCategory} />
//       <ProductList currentCategory={currentCategory} />
//     </div>
//   );
// };

// export default UserPage;