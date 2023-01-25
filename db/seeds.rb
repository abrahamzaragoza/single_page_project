User.create!(
  [
      {
          first_name: 'Root',
          last_name: 'Root',
          email: 'root@root.com',
          password: 'root'
      },
      {
          first_name: 'John',
          last_name: 'Doe',
          email: 'JOHN@example.com',
          password: 'root'
      },
      {
          first_name: 'John',
          last_name: 'Doe',
          email: 'jane@example.com',
          password: 'root'
      },
  ]
)

root = User.first
jane = User.last

products = Product.create([
  {
      name: 'Name 1',
      price: '150.99',
      description: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      quantity: 5,
      user_id: root.id
  },
  {
      name: 'Name 2',
      price: '150.99',
      description: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      quantity: 5,
      user_id: root.id
  },
  {
      name: 'Name 3',
      price: '150.99',
      description: 'Lorem ipsum dolor sit amet,consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      quantity: 5,
      user_id: root.id
  }
])

comment = Comment.create!(
  body: 'Cool product indeed !',
  product: products.first,
  user: root
)
