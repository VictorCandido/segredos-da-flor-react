# This is the Segredos da Flor projetc developed with React.js using Vercel's [Next.js](https://nextjs.org/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Features

- [ ] Customers Screen
     - [x] List customers
     - [x] Add new customer
     - [x] Edit existing customer
     - [x] Delete customer
     - [x] Filter customers
     - [x] Phone mask
     - [ ] Limit characters on table
     - [ ] Sort list by table header
     - [X] Handle with possible errors
- [ ] Products Screen
     - [x] List products
     - [x] Add new product
     - [x] Edit existing product
     - [x] Delete product
     - [x] Filter products
     - [x] Currency mask
     - [x] Is product showing mask (Sim, Não)
     - [ ] Limit characters on table
     - [ ] Sort list by table header
     - [X] Handle with possible errors
- [ ] Sale Screen
     - [x] Create cart item
     - [x] Create cart items list
     - [x] Add new item to cart items list
     - [x] Calculate cart total value
     - [x] Currency mask
     - [x] Remove item from cart items list
     - [x] Verify problem with wrong filter product's field
     - [ ] Finish sale
          - [x] Create modal to show values
          - [x] Calculate discount (percent and value)
          - [x] Type of payment
          - [ ] Confirm sale
               - [X] Save sale record on database
               - [ ] Calculate cashier values (money in)
               - [ ] Calculate stock values (product out)
     - [ ] Handle with possible errors
- [ ] Buy Screen
- [ ] Reports
- [ ] Product Stock
- [ ] Home Screen