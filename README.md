# ScholarChain — Blockchain-Based NGO Scholarship Fund Transparency System

ScholarChain ensures **transparency and accountability** in NGO scholarship fund management:

- **Donors** donate to the **NGO’s on-chain fund** (contract balance).
- **NGO Admin** records **scholarship allocations on-chain** (tamper-proof audit trail).
- **Student documents + user data** are stored **off-chain** (MongoDB).

## Tech stack

- **Frontend**: Next.js (React) + Tailwind (existing project UI)
- **Backend**: Node.js + Express + MongoDB + JWT + RBAC
- **Blockchain**: Solidity + Hardhat + MetaMask + Ethers v6

## Monorepo layout (existing folders)

```
contracts/        # Hardhat + ScholarChain.sol
backend/          # Express API + MongoDB
frontend/         # Next.js (React) UI
```

## Setup (local)

### 1) Smart contract

```bash
cd contracts
npm install
cp .env.example .env
```

Deploy to Sepolia:

```bash
npm run deploy:sepolia
```

Copy the deployed address into:
- `frontend/.env.local` as `NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS`
- `backend/.env` as `SCHOLARCHAIN_CONTRACT_ADDRESS`

### 2) Backend API

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Key pages

- `/register`, `/login`
- `/dashboard` (admin/staff)
- `/donate` (MetaMask donation; optionally records tx hash in MongoDB)
- `/students` (staff/admin add students; admin verifies)
- `/allocate` (admin allocation via MetaMask; records tx hash in MongoDB)
- `/audit` (DB transactions + on-chain allocations)

## Environment variables

- **Frontend** (`frontend/.env.local`)
  - `NEXT_PUBLIC_RPC_URL`
  - `NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS`
  - `NEXT_PUBLIC_BACKEND_URL`
- **Backend** (`backend/.env`)
  - `MONGODB_URI`, `JWT_SECRET`
  - `SEPOLIA_RPC_URL`, `SCHOLARCHAIN_CONTRACT_ADDRESS`
  - `NGO_ADMIN_PRIVATE_KEY` (optional; only needed if backend submits allocations)
- **Contracts** (`contracts/.env`)
  - `SEPOLIA_RPC_URL`, `PRIVATE_KEY`, `ETHERSCAN_API_KEY` (optional)
