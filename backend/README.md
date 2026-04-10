## ScholarChain Backend

Run:

```bash
npm install
cp .env.example .env
npm run dev
```

API:

- `POST /auth/register`
- `POST /auth/login`
- `GET /dashboard` (admin/staff)
- `GET /students` (admin/staff)
- `POST /students` (admin/staff)
- `PATCH /students/:studentId/status` (admin)
- `POST /donate` (records donation tx hash)
- `GET /donate/transactions` (admin/staff)
- `POST /allocate` (admin, backend-signer allocation - optional)
- `POST /allocate/record` (admin, record MetaMask allocation tx hash)
- `GET /allocate/transactions` (admin/staff)
- `GET /allocate/audit/onchain` (admin/staff)

