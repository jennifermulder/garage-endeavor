const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Home Goods' },
    { name: 'Office Needs' },
    { name: 'Outdoor Equipment' },
    { name: 'Clothing' },
    { name: 'Kitchen Klutter' },
    { name: 'Beyond' }
  ]);

  console.log('categories seeded');

  await User.deleteMany();

  const users = await User.insertMany([
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@testmail.com',
      password: 'password12345'
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@testmail.com',
      password: 'password12345'
    }
  ]);

  console.log('users seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Living Room Chair',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'livingroom-chair.jpg',
      category: categories[0]._id,
      tag: ['chair'],
      price: 20,
      quantity: 1,
      user: users[1]._id
    },
    {
      name: 'Standing Lamp',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'standing-lamp.jpg',
      category: categories[0]._id,
      tag: ['lighting'],
      price: 15,
      quantity: 15,
      user: users[1]._id
    },
    {
      name: 'Desk',
      category: categories[1]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'office-desk.jpg',
      tag: ['table'],
      price: 22,
      quantity: 2,
      user: users[1]._id
    },
    {
      name: 'Office Chair',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'office-chair.jpg',
      tag: ['chair'],
      price: 12,
      quantity: 5,
      user: users[1]._id
    },
    {
      name: 'Tent',
      category: categories[2]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'tent.jpg',
      tag: ['camping'],
      price: 8,
      quantity: 5,
      user: users[1]._id
    },
    {
      name: 'Patio Chair',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'patio-chair.jpg',
      tag: ['chair'],
      price: 10,
      quantity: 5,
      user: users[1]._id
    },
    {
      name: 'Light-up Shoes',
      category: categories[3]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'light-shoes.jpg',
      tag: ['shoes'],
      price: 11,
      quantity: 2,
      user: users[1]._id
    },
    {
      name: 'Waffle Sweater',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'waffle-sweater.jpg',
      tag: ['shirt'],
      price: 9,
      quantity: 1,
      user: users[1]._id
    },
    {
      name: 'Dish Drying Rack',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'drying-rack.jpg',
      tag: ['dish'],
      price: 6,
      quantity: 10,
      user: users[1]._id
    },
    {
      name: 'Kitchen Mixer',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'kitchen-mixer.jpg',
      tag: ['appliance'],
      price: 13,
      quantity: 1,
      user: users[1]._id
    },
    {
      name: 'Bucket and Mop',
      category: categories[5]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'mop-bucket.jpg',
      tag: ['cleaning'],
      price: 7,
      quantity: 10,
      user: users[1]._id
    },
    {
      name: 'Paper Towels',
      category: categories[5]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'paper-towels.jpg',
      tag: ['cleaning'],
      price: 3,
      quantity: 600,
      user: users[1]._id
    }
  ]);

  console.log({products})

  console.log('products seeded');

  await User.updateOne(
    { _id: users[0]._id },
    [{
      $set: { orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id]
        }
      ]}
    }]
  );

  // await User.deleteMany();

  // const users = await User.insertMany([
  //   {
  //     firstName: 'Pamela',
  //     lastName: 'Washington',
  //     email: 'pamela@testmail.com',
  //     password: 'password12345',
  //     orders: [
  //       {
  //         products: [products[0]._id, products[0]._id, products[1]._id]
  //       }
  //     ]
  //   },
  //   {
  //     firstName: 'Elijah',
  //     lastName: 'Holt',
  //     email: 'eholt@testmail.com',
  //     password: 'password12345'
  //   }
  // ]);

  // // await User.create({
  // //   firstName: 'Elijah',
  // //   lastName: 'Holt',
  // //   email: 'eholt@testmail.com',
  // //   password: 'password12345'
  // // });

  // console.log('users seeded');

  process.exit();
});
