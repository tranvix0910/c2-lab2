# C2-Lab2 – NodeJS app cho lab GitHub Actions

Một HTTP server nhỏ (không dùng thư viện ngoài) với các API máy tính đơn giản.

## Chạy local

```bash
npm ci          # cài đặt (dùng package-lock.json)
npm run lint    # kiểm tra cú pháp các file .js
npm test        # chạy unit test (node:test)
npm run build   # tạo thư mục dist/ (dùng làm artifact)
npm start       # chạy server tại http://localhost:3000
```

## API

| Endpoint | Ví dụ | Kết quả |
|---|---|---|
| `GET /` | `/` | `{ "message": "Hello from C2-Lab2!", "version": "1.0.0" }` |
| `GET /health` | `/health` | `{ "status": "ok" }` |
| `GET /calc/:op` | `/calc/add?a=1&b=2` | `{ "result": 3 }` |

`op` gồm: `add`, `subtract`, `multiply`, `divide`.

## Gợi ý bài tập workflow

1. Chạy `npm ci` → `lint` → `test` → `build` khi push/PR.
2. Dùng matrix chạy trên nhiều phiên bản Node (22, 24).
3. Cache npm bằng `actions/setup-node` (`cache: npm`).
4. Upload thư mục `dist/` bằng `actions/upload-artifact`.
5. Thử làm test fail (vd. sửa `add` trong `src/calculator.js`) để xem pipeline báo đỏ.
