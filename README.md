# E-Commerce
**MERN stack white-label E-Commerce application** with Admin page (ERP) allow to let owner create their own brand, products, categories, manage their users, track and analyze user behavior.

- **Admin ERP**: CRUD manage categories, products, users, tracking user history behavior, data visualation.
- **Distribution**: Browse products, manage cart/whish list, view order history, tracking shipping status, Paypal payment, product comment (review).
- **POS**: Create order, build, payment, print build, search stock, manage warehouse for business. [pending]

### How to run this source locally:

**Server**: 
 - Technologies: **ExpressJS, MongoDB, Mongoose, Redis, TypeScript, ESlint**
 - Testing: **Jest, SuperTest (Unit, Integration)**
 - Run the source: `localhost:5555` 
```
  cd server
  npm i
  npm run start
```

**Client**:
 - Technologies: **React.18, JS, Zustand, TailwindCSS, Antd, SASS, react-hook-form, lodash, Paypal, ESlint**
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
 - Choose option `open
with existing diagram` and select the diagram attach in this source (`flow_diagram.drawio`)

<img width="92" height="34" alt="Original" src="https://github.com/user-attachments/assets/bc23efdd-7f83-469a-b2b2-d58786464af3" />
<img width="92" height="34" alt="Rectangle" src="https://github.com/user-attachments/assets/7fb39a54-a217-4678-a2d0-6e6c8b06a8ae" />
<img width="92" height="34" alt="PG" src="https://github.com/user-attachments/assets/ab550b22-6036-4599-bad8-d1eb300c631c" />
<img width="92" height="34" alt="Tada Gaming" src="https://github.com/user-attachments/assets/56dfc5f9-4ae1-4f9b-ab49-3d61591d65c2" />
<img width="92" height="34" alt="Pragmatic Play" src="https://github.com/user-attachments/assets/ab54f608-8341-42bc-b71d-776bee7e1399" />

<img width="1920" height="380" alt="20250820-164341" src="https://github.com/user-attachments/assets/639ef0bc-1601-4b0f-8193-5e5a6696ddfa" />


<img width="92" height="34" alt="Original" src="https://github.com/user-attachments/assets/c7701101-445d-4279-bc36-029798b14e12" />
<img width="92" height="34" alt="Rectangle" src="https://github.com/user-attachments/assets/30a3e5aa-20c7-47fd-899f-4f5c4812127d" />
<img width="92" height="34" alt="PG" src="https://github.com/user-attachments/assets/590c9b93-0363-463d-9c7a-8b67b1c3101a" />
<img width="92" height="34" alt="Tada Gaming" src="https://github.com/user-attachments/assets/567cb215-44b9-4c4b-b4bc-e7f50552ecb3" />
<img width="92" height="34" alt="Pragmatic Play" src="https://github.com/user-attachments/assets/68bfc658-0c9c-4fc4-bed0-ffaf6abb74fe" />


<img width="1920" height="380" alt="Group 2131332803" src="https://github.com/user-attachments/assets/fd02cc56-e08e-4c14-8513-f5fb6ee01024" />


