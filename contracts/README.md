# ScholarChain Contracts

## Env
Create `.env` in `contracts/`:

```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/REPLACE
POLYGON_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/REPLACE
PRIVATE_KEY=0xREPLACE_TEST_PRIVATE_KEY
ETHERSCAN_API_KEY=REPLACE
POLYGONSCAN_API_KEY=REPLACE
```

## Commands
- Install: `npm install`
- Compile: `npx hardhat compile`
- Deploy (Sepolia): `npm run deploy:sepolia`
- Deploy (Amoy): `npm run deploy:amoy`

After deploy, copy the address into `frontend/.env.local` as `NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS`.

