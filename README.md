# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



// Iss Project ko hum fullstuck ki tarah banayenge, react to hum sikh chuke hai to main kaam to hamara frontend ka hi rahega, lekin jisko hum khud code karenge, lekin ismei hum backend bhi include karenge, halaki hame backend nhi ata to hum backend as a service BaaS use karenge.

// BaaS matlab ki hume backend nhi ata to hum backend ka kaam khud nhi karenge, balki kisi third party platfrom ka madat lenge, vese to bohut saare platfrom hai jeise appwrite, firbase, or bhi bohut kuchh. 

// hum use karenge appwrite, BaaS ka faida hame ye hai ki hame backend ka saara kaam manually code karke nhi karna padta, balki hum yeha appwrite ka banabanay classes or methods ka madat lenge.

// Sabse pehle hum ek app banayenge react mei, jeise hum banate hai, 
//npm ke sath bhi bana sakte hai or kisi or ke sath bhi bana sakte hai, vese hum to npm ke sath hi banayenge,
// uske baad kuchh important chije jo hub iss project mei use karenge vo install kar lenge terminal pe -
// vese hum in sabko alag alag bhi install kar sakte hai, or yesa bhi nhi hai ki in sab ko hame project shuru karte samai hi install karna hai , in sab ko hum apne jaroorat ke mutabib alag alag bhi install kar sakte hai,
// uske baad hum backend ka jo jo kaam hai vo pehle khatam kar denge.

//sabse pehle hum appwrite pe ek account banayenge, free wala.
// yeha hum sabse pehle ek project banayenge , vo project jo hum banayenge, jeise abhi hum mega project ke tor par ek blog bana rahe hai, megablog naam se.
// uske baad uss project ke andar ek database banayenge blog naam se,or usse database ke andar hum kuchh collections banayenge, jisse table bhi kehte hai, ye dono same hi hai, vese hitesh sir ke old ui pe collections likha tha, lekin mere new ui par tables likha hai, vese dono same hai vocabulary alag alag hai bas,

//. vese abhi hum sirf ek hi collection banayenge article naam se,
or uske baad iss collenction par yani article ke andar jayenge, or setting mei parmission section mei user naam ka ek role banayenge jismei hum kuchh permission denge, jeise create, read, update, delete. iska matlab ye hai ki user apne post ke sath ye sab kuchh kar payega or is sabka feature hum apne project mei de sakte hai.




// 21 - Appwrite database, file upload and custom queries
//Iss video mei hum sikhenge ki CRUD service keise banate hai,
//sabse pehle humne yeha ek config.js naam ka file banaya, iss file ke andar CRUD ka sara methods rahenge, jeise createPost, updatePost , deletePost, insab ka methods hum iss file mei banayenge.
// ## Class Service:

Sabse pehle hum service naam ka ek class banayenge jiske andar hum un saare methods ko banayenge. Iska 3 sabse bada faida hai—

1. **Container:** Isne saare methods (`createPost`, `uploadFile`, etc.) ko ek jagah band karke rakha hai taaki code faila hua na dikhe.
2. **Common Client:** `constructor` ki wajah se saare methods ko wahi ek `client` mil jata hai jo Appwrite se connected hai. Or client hi vo rasta hai jiske pass appwrite tak jaane ka rasta hai.
3. **Easy Access:** Frontend ko ye chinta nahi karni ki `databaseId` kya hai ya `endpoint` kya hai. Use bas method ko call karna hai.
//### Object:

Iss service ko hum direct export nhi karenge balki isko ek object banake export karenge.
Kiuki hum Class ko nahi, Object ko import karenge!
Dhyan se dekho tumne file ke aakhir mein kya kiya hai:

```jsx
const service = new Service(); // <--- Yahan Object banaya
export default service;      // <--- Object ko export kiya
```

Jab tum frontend (maan lo `Home.jsx`) mein isse use karoge, toh tum aise likhoge: `import service from "../appwrite/config.js"`

#### **Iska Fayda Kya Hai?**

Agar tum sirf `class Service` ko export karte, toh tumhe har file mein `const myService = new Service()` bar-bar likhna padta. Lekin humne file ke andar hi ek **"Asli Machine" (Object)** bana di aur usse bahar bhej diya.

Ab frontend mein tumhe bas `service.createPost()` ya `service.getPost()` likhna hai aur tumhara kaam ho jayega.

## Constructor:

achha matlab humne constructor ke andar this.client ko laya jo humne upar banaye tha client = new Client(); ye wala ye wala variable, or ye ha this ya use issliye kia taaki ahar constructor ke andar bhi client kaam ka koi variable ho to js usko naa pakde balki js samaj jaye ki hum vo constructor ke bhi upar bahar wale variable ki baat kar rahe hai, uske baad uske andar humne setEndpoint or setProject method ke jariye project id or appwrite url set kar diya,

or for daabases or bucket naam ka jo khali variable banaya tha un dono ko client variable ke sath connect kar diya

aab hum jitne bhi methods banayenge CRUD ka to uske andar ye databases or bucked variable ka use karenge jiske pass ye appwrite url or project id ka access hai batau mei kitna shi hun

## **Tumhara Breakdown vs Reality:**

1. **`this.client`:** Bilkul sahi! Class ke upar jo `client = new Client()` banaya tha, constructor ne usi ko uthaya aur usmein **Fuel**(URL aur Project ID) bhar diya.
2. **`setEndpoint` & `setProject`:** Ye dono methods basically "Appwrite ke server ka rasta" aur "Tumhare Project ki Chabi" hain. Inke bina `client` andha hai, use pata hi nahi kahan jana hai.
3. **Connecting Databases & Bucket:** Tumne kaha *"khali variable ko connect kar diya"*, ye ekdum perfect baat hai.
    - `new Databases(this.client)` ka matlab hai: "Ek database service shuru karo jo is specific client (rasta) ko use karegi."
    - `new Storage(this.client)` ka matlab hai: "Ek storage service shuru karo jo isi client ko use karegi."

    ### setEndpoint and setProject:

### **1. SDK (Software Development Kit) ka Rule** 

Jab hum `import { Client } from "appwrite"` karte hain, to hum Appwrite ki banayi hui ek "Toolkit" apne project mein la rahe hote hain. Is toolkit ke andar jo function jaisa banaya gaya hai, humein waisa hi use karna padta hai.

- Agar tum `setEndpoint` ki jagah `setURL` likhoge, to JavaScript error de dega kyunki Appwrite ki library mein `setURL`naam ka koi function hai hi nahi.

### **2. Inka Kaam Kya Hai?**

Ye methods `client` object ki **Properties** ko set karte hain:

- **`setEndpoint`**: Ye batata hai ki server kahan hai (Cloud par hai ya tumhare apne computer par).
- **`setProject`**: Ye batata hai ki us server ke andar tumhara **kaunsa project** hai (kyunki ek account mein bahut saare projects ho sakte hain).

### **3. Likhne ka Tarika (Chaining)**

Tumne apne code mein aise likha hai:

JavaScript

`this.client
    .setEndpoint(...)
    .setProject(...);`

Isse **"Method Chaining"** kehte hain. Appwrite ne inhe aise design kiya hai ki tum ek ke baad ek dot `.` lagakar inhe jod sakte ho. Ye dekhne mein clean lagta hai aur `this.client` ko baar-baar nahi likhna padta.

---

### **Summary (Pro-Tip):**

Inhe "Keywords" ki tarah samjho. Inka **Spelling** (E bada, P bada) aur **Case-sensitivity** bilkul perfect honi chahiye, nahi toh tumhari machine (Service) Appwrite ke server se connect nahi ho payegi.

### Databases and Bucked:

Ek ghar mein do cheezein hain—ek **Diary** (Database) aur ek **Store-room** (Bucket). Dono ghar ke andar hi hain, dono ko use karne ke liye wahi ek "Ghar ki Chabi" (`client`) lagti hai, par dono mein rakha jaane wala saman alag hota hai.

