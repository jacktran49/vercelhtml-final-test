This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

    1	Tạo tài khoản GitHub

Sau khi tạo xong thì gửi github để mình add vào repo ​​https://github.com/minhlq-0928/vercelblogspot
Sau đó sẽ có email yêu cầu chấp nhận invite và fork repo này về github cá nhân

    2	Tạo tài khoản vercel.com bằng tài khoản github vừa tạo

    3. Deploy
   Vào chọn New Project, Kết nối tới github và cho phép truy cập vào repo đã fork ở bước 1, khi deploy thì thêm biến NEXT_PUBLIC_DOMAIN_URL là domain của bạn
   NEXT_PUBLIC_DOMAIN_URL=http://www.dogfull.com/

    4. Link
   Link sẽ có cấu trúc như sau, có thể dùng excel để replace link http://www.dogfull.com/2022/08/the-biggest-smile-on.html
   => https://vercelblogspot.vercel.app/posts/2022/08/the-biggest-smile-on.html

    Vác link vercel app đi share thôi
