# E-Commerce
**MERN stack white-label E-Commerce application** with Admin page (ERP) allow to let owner create their own brand, products, categories, manage their users, track and analyze user behavior.

- **Admin ERP**: CRUD manage categories, products, users, tracking user history behavior, data visualation, export/import xlsx documents.
- **Distribution**: Browse products, manage cart/whish list, view order history, tracking shipping status.
- **CRM**: Create order, build, payment, print build, search stock, manage warehouse for business. [pending]

### How to run this source locally:

**Server**: 
 - Technologies: **ExpressJS, MongoDB, Redis, TypeScript, ESlint**
 - Run the source: `localhost:5555` 
```
  cd server
  npm i
  npm run start
```

**Client**:
 - Technologies: **React.18, JS, Antd, SASS, react-hook-form, lodash, ESlint**
 - Testing: **Cypress (E2E, Unit)**
 - Run the source: `localhost:<random>` 
```
  cd client
  npm i
  npm run dev
```

### Infra/DevOps:
 - Architecture: **Mono-repo**
 - CI/CD: **Github Actions**
 - Deployment:
   + Server: **Docker, K8S, EKS**
   + Client: **Vite build, Vercel** (https://e-commerce-two-rho.vercel.app) 

### How to read this source:
**Diagram**: _Included how DB models reference, how to read routes in client side, ..etc_
 - Go to https://app.diagrams.net/
 - Choose option `open with existing diagram` and select the diagram attach in this source (`flow_diagram.drawio`)
